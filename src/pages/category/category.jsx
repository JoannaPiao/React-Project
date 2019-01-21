import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Card,
    Table,
    Button,
    Icon,
    Form,
    Input,
    Select,
    Modal,
    message
} from 'antd'

import {reqCategorys, reqAddCategorys, reqUpdateCategorys} from '../../api'

const Item = Form.Item
const Option = Select.Option
/*
管理的分类管理路由组件
 */
export default class Category extends Component {
    state = {
        parentId: '0',
        parentName: '',
        categorys: [],//一级分类列表
        subCategorys: [],//二级分类列表
        isShowAdd: false,//是否显示添加的框
        isShowUpdate: false
    }
    /*
    获取一级/二级分类列表
     */
    getCategorys = async () => {
        const parentId = this.state.parentId
        const result = await reqCategorys(parentId)
        if (result.status === 0) {
            const categorys = result.data
            //更新状态
            if (parentId === '0') {
                this.setState({//更新一级数组
                    categorys
                })
            } else {
                this.setState({//更新二级数组
                    subCategorys: categorys
                })
            }

        }
    }
    /*/
    添加分类
     */
    addCategory = async () => {
        this.setState({
            isShowAdd: false
        })
        //得到输入的数据
        const {parentId, categoryName} = this.form.getFieldsValue()
        //更新分类 重置
        this.form.resetFields()
        //提交添加分类的请求
        const result = await reqAddCategorys(parentId, categoryName)

        if (result.status === 0) {
            message.success('添加成功')
            this.getCategorys()

        }

    }
    /*/
    显示更改分类
     */
    showUpdate = (category) => {
        //保存分类对象
        this.category = category
        //显示更新分类的modal
        this.setState({
            isShowUpdate: true
        })

    }
    /*/
    更新分类数据
     */
    updateCategory = async () => {

        //隐藏添加框
        this.setState({
            isShowUpdate: false
        })
        //收集数据
        const categoryId = this.category._id
        const categoryName = this.form.getFieldValue('categoryName')
        //更新分类 重置
        this.form.resetFields()
        //发ajax请求
        const result = await reqUpdateCategorys(categoryId, categoryName)
        if (result.status === 0) {
            message.success('更新成功！！');
            this.getCategorys()
        }

    }
    /*
    显示二级分类列表
     */
    showSubcategorys = (category) => {
        //setState是异步更新的状态，状态数据并不会立即更新，而是回等我的回调函数处理完更新，就是先执行了下面的getCategorys了 后执行setState了
        /*
        setstate第二个参数是回调函数，回调函数在更新完成之后立即执行
         */
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            this.getCategorys()
        })


    }

    showCategorys = () => {
        this.setState({
            parentId:'0',
            parentName:'',
            subCategorys:[]
        })
    }

    componentDidMount() {
        this.getCategorys()
    }

    componentWillMount() {
        this.columns = [{
            title: '分类名称',
            dataIndex: 'name',
            /*/
            render代码是变成链接
             */
            // render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '操作',
            width: 300,
            render: (category) => {
                return (
                    <span>
                        <a href='javascript:' onClick={() => this.showUpdate(category)}>修改分类</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href='javascript:' onClick={() => this.showSubcategorys(category)}>查看子分类</a>
                    </span>
                )
            }
        }];
    }

    render() {
        //得到列的分组
        const columns = this.columns
        //得到分类的数组
        const {categorys, isShowAdd, isShowUpdate, subCategorys, parentId,parentName} = this.state

        const category = this.category || {}
        return (
            <div>
                <Card>
                        {
                            parentId === '0'
                            ?  <span style={{fontSize: 22}}>一级分类列表</span>
                            : (
                                    <span>
                                        <a href="javascrip:" style={{fontSize:18}} onClick={this.showCategorys}>一级分类</a>
                                        &nbsp;&nbsp;&nbsp;
                                        <Icon type='arrow-right'/>
                                        &nbsp;&nbsp;&nbsp;
                                        <span>{parentName}</span>
                                    </span>

                                )
                        }
                    <Button type='primary'
                            style={{float: 'right'}}
                            onClick={() => this.setState({isShowAdd: true})}>
                        <Icon type='plus'></Icon>
                        添加分类
                    </Button>
                </Card>
                <Table
                    rowKey='_id'
                    bordered
                    columns={columns}
                    dataSource={parentId === '0' ? categorys : subCategorys}
                    loading={!categorys || categorys.length === 0}
                    pagination={{defaultPageSize: 10, showSizeChanger: true, showQuickJumper: true}}
                />
                <Modal
                    title="添加分类"
                    visible={isShowAdd}
                    onOk={this.addCategory}
                    onCancel={() => this.setState({isShowAdd: false})}
                >
                    <AddForm categorys={categorys} setForm={(form) => this.form = form}/>

                </Modal>
                <Modal
                    title="更新分类"
                    visible={isShowUpdate}
                    onOk={this.updateCategory}
                    onCancel={() => this.setState({isShowUpdate: false})}
                >
                    <UpdateForm categoryName={category.name} setForm={(form) => this.form = form}/>

                </Modal>
            </div>
        )
    }
}


/*/
更新分类的form组件
 */
class UpdateForm extends Component {
    static propTypes = {
        categoryName: PropTypes.string,
        setForm: PropTypes.func.isRequired

    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {


        const {getFieldDecorator} = this.props.form
        const {categoryName} = this.props
        console.log('categoryName', categoryName);
        return (
            <Form>
                <Item label='分类名称'>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: categoryName //没有的时候给空串

                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }

                </Item>
            </Form>
        )
    }
}

UpdateForm = Form.create()(UpdateForm)

/*
添加分类的form组件
 */
class AddForm extends Component {
    static propTypes = {
        categorys: PropTypes.array.isRequired,
        setForm: PropTypes.func.isRequired

    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {


        const {getFieldDecorator} = this.props.form
        const {categorys} = this.props
        return (
            <Form>
                <Item label='所属分类'>
                    {
                        getFieldDecorator('parentId', {
                            //如果想上来就显示一级分类  就设置initialValue="0"
                            initialValue: '0'
                        })(
                            <Select>
                                <Option key='0' value='0'>一级分类</Option>
                                {
                                    categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                                }
                            </Select>
                        )
                    }

                </Item>


                <Item label='分类名称'>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: ''
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }

                </Item>
            </Form>
        )
    }
}

AddForm = Form.create()(AddForm)

