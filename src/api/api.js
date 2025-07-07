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
    updateProjectsBatch: (updates) => api.post('/projects/batch/update',{ projects: updates }),
    deleteProjectsByIds:(ids) => api.post('/projects/delete-by-ids', { project_ids: ids }),
    // ======= 工程师相关 =======
    deleteEngineersByIds:(ids) => api.post('/engineers/delete-by-ids', { engineer_ids: ids }),
    saveEngineer: (data) => api.post('/engineers', data),
    getEngineers: (params = {}) => api.get('/engineers', { params }),
    getEngineersByMsgid: (msgid) => api.get(`/engineers/by-msgid/${msgid}`),
    updateEngineerRecommendations: (engineerId, projectIds) =>
        api.put(`/engineers/${engineerId}/recommendations`, { recommended_projects: projectIds }),

    searchEngineers: (data) => api.post('/engineers/search', data),
    updateEngineersBatch: (updates) => api.post('/engineers/batch-update',{ engineers: updates }),
    getAvailableEngineersSummary:() => api.get(`/engineers/available-summary`),
    // ======= 推荐相关 =======
    recommendEngineers: (projectInfo) => api.post('/recommend/engineers', projectInfo),
    recommendProjects: (engineerInfo) => api.post('/recommend/projects', engineerInfo),

    // ======= 邮件处理相关 =======
    processEmailsOnce: () => api.post('/emails/process'),
    getEmailProcessStatus: () => api.get('/emails/status'),

    // ======= ID生成相关 =======
    generateMsgid: () => api.get('/generate/msgid'),
    generateProjectId: () => api.get('/generate/project-id'),
    generateEngineerId: () => api.get('/generate/engineer-id'),

    // ======= 工具类 =======
    checkEmailExists: (emailId) => api.get(`/check-email/${emailId}`),
    getMessageByEmailId: (emailId) => api.get(`/message-by-email/${emailId}`),
};

export default apiService;
