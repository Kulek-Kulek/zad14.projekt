App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {  
    this.setState({
      loading: true  // 2.
    });
    this.getGif(searchingText, function(gif) {  
      this.setState({  
        loading: false,
        gif: gif,  
        searchingText: searchingText  
      });
    }.bind(this));
  },

  componentWillMount(){
    var promise = new Promise(function(resolve, reject){

        console.log('1. start setTimeout');

        setTimeout(function(){
            console.log('3. end set timeout');
            // resolve(1);
            resolve(1);
        }, 4000)
    });

    promise.then(
        function(data){
            console.log('4. data', data);
        }, 
        function(err){
            console.log('4. error data', err);
        }
    )
    console.log('2. to sie dzieje po obietnicy');

  },

  getGif: function(searchingText, callback) {  

    // var GIPHY_PUB_KEY = '';
    // var GIPHY_API_URL = '';
    var GIPHY_PUB_KEY = 'kjBxLdT8QQP2NDurPbw8C9aGv1WWptMT';
    var GIPHY_API_URL = 'https://api.giphy.com';
    var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
    var xhr = new XMLHttpRequest();  
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
           var data = JSON.parse(xhr.responseText).data; 
            var gif = {  
                url: data.fixed_width_downsampled_url,
                sourceUrl: data.url
            };
            callback(gif);  
        }
    };
    xhr.send();
},

    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch} />
            <Gif
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />
          </div>
        );
    }
});




