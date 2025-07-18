// src/api/api.js
import api from './axiosInstance';

const apiService = {
    // ======= 消息相关 =======
    saveMessage: (data) => api.post('/messages', data),
    getEmails: (params = {}) => api.get('/messages', { params }),
    searchMessages: (params) => api.post('/messages/search',{ params: params }),
    updateEmailStatus: (msgid, status) => api.put(`/messages/${msgid}/status`, { status }),
    getMessageWithAttachments: (msgid) => api.get(`/messages/${msgid}/attachments`),
    updateMessagesStatusBatch: (updates) => api.post('/messages/status/batch',{ updates: updates }),
    deleteMessagesBatch:(ids) => api.post('/messages/batch-delete', { msgids: ids }),
    // ======= 案件相关 =======
    saveProject: (data) => api.post('/projects', data),
    getProjects: (params = {}) => api.get('/cases', { params }),
    getProjectsByMsgid: (msgid) => api.get(`/projects/by-msgid/${msgid}`),
    updateProjectRecommendations: (projectId, engineerIds) =>
        api.put(`/projects/${projectId}/recommendations`, { recommended_engineers: engineerIds }),
    searchProjects:(params) => api.post('/projects/search', params),
    getActiveProjectsSummary:() => api.get(`/projects/active-summary`),
    updateProjectsBatch: (updates) => api.post('/projects/batch-update',{ projects: updates }),
    deleteProjectsByIds:(ids) => api.post('/projects/delete-by-ids', { project_ids: ids }),
    // ======= 工程师相关 =======
    deleteEngineersByIds:(ids) => api.post('/engineers/delete-by-ids', { engineer_ids: ids }),
    saveEngineer: (data) => api.post('/engineers', data),
    getEngineers: (params = {}) => api.get('/engineers', { params }),
    getEngineersByMsgid: (msgid) => api.get(`/engineers/by-msgid/${msgid}`),
    updateEngineerRecommendations: (engineerId, projectIds) =>
        api.put(`/engineers/${engineerId}/recommendations`, { recommended_projects: projectIds }),
    downloadFileEndpoint: (MSGID, excleName) => api.get(`/download/${MSGID}/${excleName}`),

    searchEngineers: (data) => api.post('/engineers/search', data),
    updateEngineersBatch: (updates) => api.post('/engineers/batch-update',{ engineers: updates }),
    getAvailableEngineersSummary:() => api.get(`/engineers/available-summary`),

    // ======= 邮件处理相关 =======
    processEmailsOnce: () => api.post('/emails/process'),
    // ======= 用户管理相关 =======
    authenticateUser:(params) => api.post('/auth/login', params),
    changePassword:(params) => api.post('/users/change-password', params),
    searchUsers:(params) => api.post(`/users/search`,params),
    createUser:(params) => api.post('/users/create', params),
    deleteUsers:(params) => api.post('/users/delete', params),
    resetUsersStatus:(params) => api.post('/users/reset-status', params),
};

export default apiService;
