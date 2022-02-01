const { RESTDataSource } = require('apollo-datasource-rest');

class SitesService extends RESTDataSource {
    constructor(lambaFunctionsUrl) {
        super();

        this.baseURL = lambaFunctionsUrl.trim().length === 0
            ? 'http://localhost:3000/'
            : lambaFunctionsUrl;
    }

    addSite = async (url, description) => {
        const data = await this.post('sites/add', { url, description })
            .then((result) => {
                return result;
            }).catch((error) => {
                console.log(error);
            });

        if (data == null || (data !== null && data.acknowledged === false)) {
            return null;
        }

        return { id: data.insertedId, url, description }
    };

    deleteSite = async (id) => {
        const data = await this.delete(`sites/delete?id=${encodeURIComponent(id)}`)
            .then((result) => {
                return result;
            }).catch((error) => {
                console.log(error);
            });

        if (data == null || (data !== null && data.value === null)) {
            return false;
        }

        return true;
    };

    getData = (data) => {
        return {
            id: data._id,
            url: data.url,
            description: data.description,
            lastChecked: data.lastChecked === undefined ? '' : data.lastChecked
        }
    }

    getSite = async (id) => {
        const data = await this.get(`sites/get?id=${encodeURIComponent(id)}`)
            .then((result) => {
                return result;
            }).catch((error) => {
                console.log(error);
            });

        if (data == null) {
            return null;
        }

        return this.getData(data);
    };

    getSites = async () => {
        const data = await this.get('sites/list')
            .then((result) => {
                return result;
            }).catch((error) => {
                console.log(error);
            });

        if (data == null) {
            return null;
        }

        let sites = [];

        data.forEach((site) => {
            sites.push(this.getData(site))
        });

        return sites;
    };

    updateSite = async (id, url, description, lastChecked) => {
        const data = await this.put(`sites/update?id=${encodeURIComponent(id)}`, { url, description, lastChecked })
            .then((result) => {
                return result;
            }).catch((error) => {
                console.log(error);
            });

        if (data == null || (data !== null && data.value === null)) {
            return null;
        }

        return this.getData({ _id: data.value._id, url, description, lastChecked });
    };
}

module.exports = SitesService;