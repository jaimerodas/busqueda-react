var User = React.createClass({
  render: function() {
    return (
      <li className="user" id={'user-' + this.props.id} >
        <div className="fullname">{this.props.nombre + ' ' + this.props.apellido}</div>
        <div className="email">{this.props.email}</div>
      </li>
    );
  }
});

var UserList = React.createClass({
  render: function() {
    if (this.props.data.length > 0) {
      var userNodes = this.props.data.map(function(user) {
        return (
          <User nombre={user.nombre} apellido={user.apellido} email={user.email} id={user.id}></User>
        );
      });

      return (
        <ul className="users">
          {userNodes}
        </ul>
      );
    } else {
      return (
        <div className="error">
          We couldn't find any users matching <span>{this.props.term}</span>
        </div>
      );
    }
  }
});

var SearchBar = React.createClass({
  getInitialState: function() {
    return {term: ''}
  },

  search: function(e) {
    this.setState({term: e.target.value})
    if (e.target.value.length > 1) {
      console.log('Vamos a buscar: ', e.target.value)
      this.props.onSearch({q: e.target.value});
    }
  },

  render: function() {
    return (
      <input
        type="search"
        value={this.state.term}
        placeholder="Find users by their name or last name"
        onChange={this.search}
      />
    );
  }
});

var UserBox = React.createClass({
  getInitialState: function() {
    return {data: this.props.data, term: ''};
  },

  handleSearch: function(term) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      data: term,
      success: function(data) {
        this.setState({data: data, term: term.q});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: this.props.data, term: term.q});
        console.error(status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="users-container">
        <h1>Users</h1>
        <SearchBar onSearch={this.handleSearch}></SearchBar>
        <UserList data={this.state.data} term={this.state.term}></UserList>
      </div>
    )
  }
});

ReactDOM.render(
  <UserBox data={data} url="/search" />,
  document.getElementById('content')
);
