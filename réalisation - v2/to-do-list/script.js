// Composant : Tâche
class Task extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let class_name = 'task'
    class_name += this.props.done ? ' task-success' : ' task-info';
  
    return (
      <div className={class_name} onClick={this.props.onClickTask}>
        <span>{this.props.value}</span>
        <i className="close" onClick={this.props.onClickClose}>&times;</i>
      </div>
    )
  }
}

// Application
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tasksArray: [
        {value: 'Tâche 1', done: true},
        {value: 'Tâche 2', done: false},
        {value: 'Tâche 3', done: false}
      ],
      value: ''
    }
  }

  addTask(e) {
    
    
     if (addInput.value.length != 0) {
      this.state.tasksArray.push({
        value: addInput.value,
        done: false
      })
      
      
      this.setState(state => ({
        tasksArray: state.tasksArray
      }));

    }

    e.preventDefault()
  }

  removeTask(i) {
    this.state.tasksArray.splice(i, 1)
    this.setState({
      tasksArray: this.state.tasksArray
    })
  }

  markDone(i) {
    let tasksArray = this.state.tasksArray
    let task = this.state.tasksArray[i]
    tasksArray.splice(i, 1)
    task.done = !task.done 
    
    task.done ? tasksArray.push(task) : tasksArray.unshift(task)


    this.setState({
      tasksArray: tasksArray
    })

    
  }

  onChangeInput(e) {
    // this.setState({value: e.target.value})
  }

  render() {
    let tasksArray = this.state.tasksArray.map((task, i) => {
      return (
        <Task 
          key={i}
          value={task.value}
          done={task.done}
          onClickClose={this.removeTask.bind(this, i)}
          onClickTask={this.markDone.bind(this, i)}
        />
      )
    })

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h1> Tâches à faire</h1>
            <form
              id="form-add"
              className="form-horizontal"
              onSubmit={this.addTask.bind(this)}>
              <div className="input-group">
                <input type="text" id="addInput" className="form-control" onChange={this.onChangeInput.bind(this)} placeholder="Description de la tâche..." />
                <div className="input-group-btn">
                  <button type="submit" className="btn btn-default">
                    <span className="glyphicon glyphicon-plus-sign"></span>
                  </button>
                </div>
              </div>
            </form>

            {tasksArray}
            
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));