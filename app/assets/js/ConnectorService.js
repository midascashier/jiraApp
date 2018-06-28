class connectorService {

    constructor(){
        this.dev = true;
        this.getMethod = 'GET';
        this.postMethod = 'POST';
        this.updateMethod = 'UPDATE';
        this.deleteMethod = 'DELETE';
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
                data: request,
                dataType: 'jsonp',
                url: 'https://jira-midas.herokuapp.com/system/ServiceData.class.php'
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