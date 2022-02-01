const Query = {
    get: async (parent, { id }, { dataSources }, info) => {
        return await dataSources.sitesService.getSite(id);
    },
    list: async (parent, args, { dataSources }, info) => {
        return await dataSources.sitesService.getSites();
    }
}

const Mutation = {
    add: async (parent, { site }, { dataSources }, info) => {
        return await dataSources.sitesService.addSite(site.url, site.description);
    },
    delete: async (parent, { id }, { dataSources }, info) => {
        return await dataSources.sitesService.deleteSite(id);
    },
    update: async (parent, { id, site }, { dataSources }, info) => {
        return await dataSources.sitesService.updateSite(id, site.url, site.description, site.lastChecked);
    }
}

module.exports = {
    Query, Mutation
};