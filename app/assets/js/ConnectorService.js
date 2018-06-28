class connectorService {

    constructor(){
        this.dev = true;
        this.getMethod = 'GET';
        this.putMethod = 'PUT';
        this.postMethod = 'POST';
        this.deleteMethod = 'DELETE';
        this.url = '/atlassian-connect.json';

        this.httpServiceAsync({}, this.getMethod).then((connect)=>{
            this.url = connect.baseUrl + '/system/ServiceData.php';
        })
    }

    getQueuesController(){
        let request = {
            'document' : 'queues'
        };

        return this.httpServiceAsync(request, this.getMethod);
    }

    addQueuesController(data){
        let request = {
            'document' : 'queues',
            'data' : data
        };

        return this.httpServiceAsync(JSON.stringify(request), this.postMethod);
    }

    /**
     * Http post service that returns a Promise
     *
     * @param request
     * @param method
     * @returns {Promise}
     */
    httpServiceAsync(request, method){
        return new Promise((resolve) => {
            $.ajax({
                type: method,
                url: this.url,
                data: request,
                dataType: 'jsonp'
            }).done(function(response){
                resolve(response);
            }).fail(function(response){
                let dataResponse = 'A error as occurred';

                if(response.responseText){
                    dataResponse = JSON.parse(response.responseText);
                }

                resolve(dataResponse);
            });
        })
    }
}

export let ConnectorService = new connectorService();