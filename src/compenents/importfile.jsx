//导入组件封装

import React, { Component } from 'react'
import { Upload, message ,Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export default class ImportFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url:props.url,
    }
  }

  render() {
    const props = {
      name: 'file',
      multiple: true,
      action: this.state.url,//上传地址
      data:{testTypeId:this.props.testTypeId},
      headers: {
        ContentType:'application/json',
      },

      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} 文件上传成功.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} 文件上传失败.`);
        }
      },
    };

    return (
          <Modal title={this.props.upTitle}
                 centered
                 visible={this.props.visible}
                 onCancel={this.props.onCancel}
                 footer={null}
                 width="800">
            <div className="ant-modal-body" style={{height:"100%"}}>
              <div style={{height:"100%",width:"100%"}}>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">点击或拖动文件到此区域进行上传</p>
                  <p className="ant-upload-hint">
                    支持单个或批量上传
                  </p>
              </Dragger>
              </div>
            </div>
          </Modal>
    
    )
  }
}
