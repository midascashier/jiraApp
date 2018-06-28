import appUI from './appUI'
import {PrettyLoader} from './PrettyLoader'

class project{
    load(action, method = 'GET', data = {}){
        PrettyLoader(appUI.elementLoad);

        return new Promise((resolve)=>{
            AP.request(action, {
                type: method,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function(response){
                    console.log(response);
                    resolve(JSON.parse(response))
                },
                error: function(e){
                    console.log(e);
                    document.getElementById(appUI.contentID).innerHTML = e
                }
            })
        })
    }

    list(){
        return this.load('/rest/api/2/project')
    }

    info(project){
        return this.load('/rest/api/2/project/' + project)
    }

    getQueues(project){
        return this.load(`/rest/servicedeskapi/servicedesk/${project}/queue`)
    }

    getIssuesQueue(project, queue){
        return this.load(`/rest/servicedeskapi/servicedesk/${project}/queue/${queue}/issue`)
    }

    changePriority(issueId, score){
        let issueData =  {
            "fields": {
                "customfield_10069" : score
            }
        };

        return this.load('/rest/api/2/issue/' + issueId, 'PUT', issueData)
    }
}

export let Project = new project();