interface State {
  file: string
  type: string
  content: string
}

interface Upload {
  stat: string
  file: string
}

class App extends React.Component<any, State> {
  uploadBtn: HTMLInputElement
  openBtn: HTMLInputElement

  state: State = {
    file: '',
    type: '',
    content: ''
  }

  // 选择的文件发生了变化
  async onUploadChange() {
    let file = this.uploadBtn.files[0]
    // 上传文件
    let res = await fetch('/api/upload?name=' + encodeURIComponent(file.name), {
      method: 'POST',
      body: file
    })
    let result: Upload = await res.json()
    if (result.stat === 'OK' && result.file !== '') {
      this.setState({
        file: result.file
      })
    }
    console.log(result)
  }

  // 读取文本
  readText(file: File) {
    let reader = new FileReader()
    reader.onload = event => {
      this.setState({
        type: 'text',
        content: event.target.result as string
      })
    }
    reader.readAsText(file)
  }

  // 读取图片
  readImage(file: File) {
    let reader = new FileReader()
    reader.onload = event => {
      this.setState({
        type: 'image',
        content: event.target.result as string
      })
    }
    reader.readAsDataURL(file)
  }

  // 选择的文件发生了变化
  async onOpenChange() {
    let file = this.openBtn.files[0]
    if (file.type && file.type.startsWith('text')) {
      this.readText(file)
    } else if (file.type.startsWith('image')) {
      this.readImage(file)
    } else {
      alert('请选择图片或文本文件')
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>选择文件上传</h1>
        <p>
          <input
            type="file"
            ref={ref => (this.uploadBtn = ref)}
            onChange={this.onUploadChange.bind(this)}
          />
        </p>
        <p>
          {this.state.file !== '' && <a href={"/api/download?file=" + this.state.file}>{this.state.file}</a>}
        </p>
        <h1>选择图片或文本文件打开</h1>
        <p>
          <input
            type="file"
            ref={ref => (this.openBtn = ref)}
            onChange={this.onOpenChange.bind(this)}
          />
        </p>
        {this.state.type === 'text' && <pre>{this.state.content}</pre>}
        {this.state.type === 'image' && <img src={this.state.content} />}
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
