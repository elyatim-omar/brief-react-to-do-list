// Composant : Tâche
class Tache extends React.Component {
   

  render() {
      let class_name = 'tache'
      class_name += this.props.done == 1 ? ' tache-faite' : ' tache-info';

      return (
          <div className={class_name} onClick={this.props.onClickTask}>
              <span>{this.props.value}</span>
              <i className="close fa fa-trash" onClick={this.props.onClickClose}></i>
          </div>
      )
  }
}

// Application
class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
       tacheList: []
    };
  }
  componentDidMount() {
    this.chargementDonnees();
  }
  chargementDonnees(){

    var dataList = null;
    
    // affichage de données par Ajax

    $.getJSON( "api/gettasks.php", 
    function( data ) {
     
      this.setState({ tacheList: data});
    }.bind(this))
    .fail(function(jqXHR, textStatus, errorThrown) 
    {
       console.log(errorThrown);
   })
    ;
 
  }

  addTask(e) {
    
    $.ajax({
        url:"/api/addtasks.php",
        method:"POST",
        data:{
            task : addInput.value ,
        },
        success:function(data) {
          this.chargementDonnees()
          
      }.bind(this)
      })
    

   e.preventDefault()
 }

 removeTask(i) {
 
    $.ajax({
      url:"/api/deletetasks.php",
      method:"POST",
      data:{
        sid : i
      },
      success:function(data) {
        
        $(this).parent().remove();
        this.chargementDonnees()
      }.bind(this)
    })
    

}
markDone(i,status) {

if (status != 1) {
  $.ajax({
    url:"api/edittask.php",
    method:"POST",
    data:{
      sid : i,
      done : 1
    },
    success:function(data) {
      this.chargementDonnees()
     
  }.bind(this)
  })
}else{
  $.ajax({
    url:"api/edittask.php",
    method:"POST",
    data:{
      sid : i,
      done : 0
    },
    success:function(data) {
      this.chargementDonnees()
      
  }.bind(this)
  })
}

}


  render() {
   
    let tachesArrayMap = this.state.tacheList.map((tache) => {
      return (
        <Tache 
          key={tache.id}
          value={tache.task}
          done={tache.done}
          onClickClose={this.removeTask.bind(this, tache.id)}
          onClickTask={this.markDone.bind(this, tache.id,tache.done)}
        />
      )
    })

    return (
      
      <div className="container float-left">
      <div className="head col-sm-12 "> <h1 className="text-center"> TO DO LIST </h1> </div>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
         
            
            <form id="form-add"
              className="form-horizontal" onSubmit={this.addTask.bind(this)}>
              <div className="input-group">
                <input type="text" id="addInput" className="form-control"  placeholder="enter your task..."  required />
                <div className="input-group-btn">
                  <button type="submit" className="btn btn-default">
                    <span className="glyphicon glyphicon-plus-sign"></span>
                  </button>
                </div>
              </div>
            </form>

            {tachesArrayMap}
                        
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));