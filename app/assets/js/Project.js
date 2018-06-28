import {ConnectorService} from './ConnectorService'

class project{
     list(){
        return ConnectorService.load('/rest/api/2/project')
     }

     info(project){
        return ConnectorService.load('/rest/api/2/project/' + project)
     }

     getQueues(project){
        return ConnectorService.load(`/rest/servicedeskapi/servicedesk/${project}/queue`)
     }

     getIssuesQueue(project, queue){
        return ConnectorService.load(`/rest/servicedeskapi/servicedesk/${project}/queue/${queue}/issue`)
     }

     changePriority(issueId, score){
        let issueData =  {
            "fields": {
                "customfield_10069" : score
            }
        };

        return ConnectorService.load('/rest/api/2/issue/' + issueId, 'PUT', issueData)
     }
}

export let Project = new project();