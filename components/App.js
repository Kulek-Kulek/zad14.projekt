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
    var self = this;
    this.getGif(searchingText)
        .then(
            function(gif){
              self.setState({  
                loading: false,
                gif: gif,  
                searchingText: searchingText  
              });
            }, 
            function(err){
                console.log('ERROR: ', err);
            }
        )
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

  getGif: function(searchingText) {  
    var GIPHY_PUB_KEY = '';
    var GIPHY_API_URL = '';
    var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data; 
                var gif = {  
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                resolve(gif); 
            } else {
                reject('Nie poprawny status odpowiedzi');
            } 
        };
        xhr.send();
    })

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




