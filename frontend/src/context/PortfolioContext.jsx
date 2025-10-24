import React, { createContext, useState, useContext, useEffect } from 'react';
import { portfolioService } from '../services/portfolioService';
import { useAuth } from './AuthContext';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPortfolios();
    }
  }, [isAuthenticated]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await portfolioService.getAll();
      setPortfolios(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching portfolios');
    } finally {
      setLoading(false);
    }
  };

  const createPortfolio = async (portfolioData) => {
    try {
      const response = await portfolioService.create(portfolioData);
      setPortfolios([response.data, ...portfolios]);
      setCurrentPortfolio(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updatePortfolio = async (id, portfolioData) => {
    try {
      const response = await portfolioService.update(id, portfolioData);
      setPortfolios(portfolios.map(p => p._id === id ? response.data : p));
      if (currentPortfolio?._id === id) {
        setCurrentPortfolio(response.data);
      }
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deletePortfolio = async (id) => {
    try {
      await portfolioService.delete(id);
      setPortfolios(portfolios.filter(p => p._id !== id));
      if (currentPortfolio?._id === id) {
        setCurrentPortfolio(null);
      }
    } catch (err) {
      throw err;
    }
  };

  const getPortfolioById = async (id) => {
    try {
      const response = await portfolioService.getById(id);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const exportPortfolio = async (id) => {
    try {
      const blob = await portfolioService.exportPortfolio(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-${id}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      throw err;
    }
  };

  const value = {
    portfolios,
    currentPortfolio,
    setCurrentPortfolio,
    loading,
    error,
    fetchPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPortfolioById,
    exportPortfolio
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};
