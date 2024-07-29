const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const logs =  async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const search = req.query.search || '';
    const filter = req.query.filter || 'all';
  
    const logFile = path.join(__dirname, '../app.log');
    const data = await fs.readFile(logFile, 'utf8');
    let logs = data.split('\n').filter(Boolean).map(JSON.parse);
  
    // Apply search
    if (search) {
      logs = logs.filter(log => 
        JSON.stringify(log).toLowerCase().includes(search.toLowerCase())
      );
    }
  
    // Apply filter
    if (filter !== 'all') {
      logs = logs.filter(log => log.level === filter);
    }
  
    const totalLogs = logs.length;
    const totalPages = Math.ceil(totalLogs / limit);
    logs = logs.slice((page - 1) * limit, page * limit);
    console.log(req.originalUrl);
    res.send({ 
      logs, 
      page, 
      totalPages, 
      search, 
      filter,
      currentUrl: req.originalUrl
    });
    // res.send(logs);
};


module.exports = {
    logs,
  };