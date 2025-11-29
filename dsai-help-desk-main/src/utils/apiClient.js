// API Client for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Chat API
 */
export const chatAPI = {
  async sendMessage(sessionId, message, userRole, context = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          message,
          userRole,
          context,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Network error' }));
        throw new Error(error.detail || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Chat API error:', error);
      throw error;
    }
  },
};

/**
 * Tickets API
 */
export const ticketsAPI = {
  async getTickets(sessionId = null, status = null) {
    try {
      const params = new URLSearchParams();
      if (sessionId) params.append('session_id', sessionId);
      if (status) params.append('status', status);

      const url = `${API_BASE_URL}/api/tickets${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Tickets API error:', error);
      throw error;
    }
  },

  async getTicket(ticketId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get ticket API error:', error);
      throw error;
    }
  },

  async updateTicketStatus(ticketId, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Update ticket API error:', error);
      throw error;
    }
  },
};

/**
 * Metrics API
 */
export const metricsAPI = {
  async getSummary() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/metrics/summary`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Metrics summary API error:', error);
      throw error;
    }
  },

  async getTrends(days = 7) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/metrics/trends?days=${days}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Metrics trends API error:', error);
      throw error;
    }
  },
};

