import {ConnectorService} from './ConnectorService'

class project{
    static list(){
        return ConnectorService.load('/rest/api/2/project')
    }

    static info(project){
        return ConnectorService.load('/rest/api/2/project/' + project)
    }

    static getQueues(project){
        return ConnectorService.load(`/rest/servicedeskapi/servicedesk/${project}/queue`)
    }

    static getIssuesQueue(project, queue){
        return ConnectorService.load(`/rest/servicedeskapi/servicedesk/${project}/queue/${queue}/issue`)
    }

    static changePriority(issueId, score){
        let issueData =  {
            "fields": {
                "customfield_10069" : score
            }
        };

        return ConnectorService.load('/rest/api/2/issue/' + issueId, 'PUT', issueData)
    }
}

export let Project = new project();