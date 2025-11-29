import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SyncIcon from '@mui/icons-material/Sync';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import {
  kbArticles,
} from '../data/mockConfiguration';

const ConfigurationInterface = () => {
  const [articles, setArticles] = useState(kbArticles);
  const [addArticleOpen, setAddArticleOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [indexingProgress, setIndexingProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isIndexing, setIsIndexing] = useState(false);
  const [uploadStage, setUploadStage] = useState(''); // 'upload' or 'indexing'
  const [uploadStatus, setUploadStatus] = useState('Live');
  const [uploadSource, setUploadSource] = useState('Manual');
  const [uploadVersion, setUploadVersion] = useState('1.0');
  const fileInputRef = useRef(null);
  const uploadInProgressRef = useRef(false);
  const articlesCreatedRef = useRef(false);

  // Register Chart.js components

  const handleAddArticle = () => {
    setAddArticleOpen(true);
    setFiles([]);
    setUploadProgress(0);
    setIndexingProgress(0);
    setIsUploading(false);
    setIsIndexing(false);
    setUploadStage('');
    setUploadStatus('Live');
    setUploadSource('Manual');
    setUploadVersion('1.0');
    uploadInProgressRef.current = false;
    articlesCreatedRef.current = false;
  };

  const handleCloseAddArticle = () => {
    setAddArticleOpen(false);
    setFiles([]);
    setUploadProgress(0);
    setIndexingProgress(0);
    setIsUploading(false);
    setIsIndexing(false);
    setUploadStage('');
    setUploadStatus('Live');
    setUploadSource('Manual');
    setUploadVersion('1.0');
    uploadInProgressRef.current = false;
    articlesCreatedRef.current = false;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (fileList) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/markdown',
    ];
    const validFiles = fileList.filter((file) => allowedTypes.includes(file.type) || file.name.endsWith('.md'));
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => index !== i));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const simulateUpload = () => {
    if (files.length === 0 || uploadInProgressRef.current) return;

    uploadInProgressRef.current = true;
    setIsUploading(true);
    setUploadStage('upload');
    setUploadProgress(0);
    setIndexingProgress(0);

    // Store the files and settings at the time of upload to avoid stale closures
    const filesToUpload = [...files];
    const statusToUse = uploadStatus;
    const sourceToUse = uploadSource;
    const versionToUse = uploadVersion;

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          setIsIndexing(true);
          setUploadStage('indexing');
          
          // Start indexing simulation
          const indexingInterval = setInterval(() => {
            setIndexingProgress((prev) => {
              if (prev >= 100) {
                clearInterval(indexingInterval);
                setIsIndexing(false);
                
                // Add articles to the list - only if not already created
                if (!articlesCreatedRef.current) {
                  articlesCreatedRef.current = true;
                  
                  setArticles((currentArticles) => {
                    const now = new Date();
                    const date = now.toISOString().split('T')[0];
                    const time = now.toTimeString().split(' ')[0].substring(0, 5);
                    
                    const newArticles = filesToUpload.map((file, index) => {
                      const articleId = `KB-${date.replace(/-/g, '')}-${String(currentArticles.length + index + 1).padStart(3, '0')}`;
                      return {
                        id: articleId,
                        title: file.name.replace(/\.[^/.]+$/, ''),
                        status: statusToUse,
                        source: sourceToUse,
                        lastUpdated: `${date} ${time}`,
                        views: 0,
                        confidence: 0.95,
                        version: versionToUse,
                      };
                    });
                    
                    return [...newArticles, ...currentArticles];
                  });
                  
                  // Close dialog after a short delay
                  setTimeout(() => {
                    handleCloseAddArticle();
                  }, 1500);
                }
                
                return 100;
              }
              return prev + 5;
            });
          }, 150);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDeleteArticle = (articleId) => {
    setArticles(articles.filter((article) => article.id !== articleId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
        return '#4A7C59';
      case 'Old':
        return '#FF9500';
      case 'Archive':
        return '#666666';
      default:
        return '#999999';
    }
  };


  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: '#1a1a1a', minHeight: '100vh', maxWidth: '1920px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <MenuBookIcon sx={{ fontSize: 40, color: '#D4AF37' }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
              Knowledge Base Management
            </Typography>
            <Typography variant="body1" sx={{ color: '#E0E0E0', mt: 0.5 }}>
              Manage knowledge base articles and data sources
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 10 }}>
          <Chip
            label="Production-Ready System - Available Month 24"
            sx={{
              backgroundColor: '#4A7C59',
              color: '#1a1a1a',
              fontWeight: 'bold',
              height: '32px',
            }}
          />
        </Box>
      </Box>

      {/* Knowledge Base Content */}
      <Box>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
            Knowledge Base Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ backgroundColor: '#D4AF37', color: '#1a1a1a' }}
              onClick={handleAddArticle}
            >
              Add Article
            </Button>
            <Button
              variant="outlined"
              startIcon={<SyncIcon />}
              sx={{ borderColor: '#4A7C59', color: '#4A7C59' }}
            >
              Sync MKDocs
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ backgroundColor: '#242424', border: '1px solid #333333' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#1a1a1a' }}>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Title</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Source</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Version</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Last Updated</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Views</TableCell>
                    <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow
                      key={article.id}
                      sx={{
                        backgroundColor: '#242424',
                        '&:hover': { backgroundColor: '#2a2a2a' },
                        borderBottom: '1px solid #333333',
                      }}
                    >
                      <TableCell sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>{article.id}</TableCell>
                      <TableCell sx={{ color: '#E0E0E0' }}>{article.title}</TableCell>
                      <TableCell>
                        <Chip
                          label={article.status}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(article.status),
                            color: '#ffffff',
                            fontWeight: 'bold',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#999999' }}>{article.source}</TableCell>
                      <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>{article.version || '1.0'}</TableCell>
                      <TableCell sx={{ color: '#999999' }}>{article.lastUpdated}</TableCell>
                      <TableCell sx={{ color: '#999999' }}>{article.views.toLocaleString()}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button size="small" startIcon={<EditIcon />} sx={{ color: '#D4AF37', minWidth: 'auto' }}>
                            Edit
                          </Button>
                          <Button
                            size="small"
                            startIcon={<DeleteIcon />}
                            sx={{ color: '#FF9500', minWidth: 'auto' }}
                            onClick={() => handleDeleteArticle(article.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

        {/* Add Article Dialog with Drag & Drop */}
        <Dialog
          open={addArticleOpen}
          onClose={handleCloseAddArticle}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: '#242424',
              border: '1px solid #333333',
              borderRadius: '8px',
            },
          }}
        >
          <DialogTitle sx={{ color: '#D4AF37', fontWeight: 'bold', borderBottom: '1px solid #333333', pb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                Upload Knowledge Base Documents
              </Typography>
              <IconButton onClick={handleCloseAddArticle} sx={{ color: '#999999' }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Drag and Drop Zone */}
              <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  border: `2px dashed ${isDragging ? '#D4AF37' : '#333333'}`,
                  borderRadius: '8px',
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: isDragging ? '#2a2a2a' : '#1a1a1a',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#D4AF37',
                    backgroundColor: '#2a2a2a',
                  },
                }}
              >
                <CloudUploadIcon sx={{ fontSize: 64, color: isDragging ? '#D4AF37' : '#666666', mb: 2 }} />
                <Typography variant="h3" sx={{ color: '#E0E0E0', mb: 1, fontWeight: 'bold' }}>
                  Drag & Drop Files Here
                </Typography>
                <Typography variant="body2" sx={{ color: '#999999', mb: 2 }}>
                  or click to browse files
                </Typography>
                <Typography variant="caption" sx={{ color: '#666666', display: 'block' }}>
                  Supported formats: PDF, DOC, DOCX, TXT, MD
                </Typography>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.md"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </Box>

              {/* File List */}
              {files.length > 0 && (
                <Box>
                  <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 2 }}>
                    Selected Files ({files.length})
                  </Typography>
                  <Paper sx={{ backgroundColor: '#1a1a1a', border: '1px solid #333333', maxHeight: 300, overflow: 'auto' }}>
                    <List>
                      {files.map((file, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            borderBottom: index < files.length - 1 ? '1px solid #333333' : 'none',
                            '&:hover': { backgroundColor: '#242424' },
                          }}
                          secondaryAction={
                            <IconButton edge="end" onClick={() => removeFile(index)} sx={{ color: '#FF9500' }}>
                              <CloseIcon />
                            </IconButton>
                          }
                        >
                          <ListItemIcon>
                            <DescriptionIcon sx={{ color: '#D4AF37' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body1" sx={{ color: '#E0E0E0' }}>
                                {file.name}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" sx={{ color: '#999999' }}>
                                {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Box>
              )}

              {/* Status, Source, and Version Selection */}
              {files.length > 0 && !isUploading && !isIndexing && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#999999' }}>Status</InputLabel>
                    <Select
                      value={uploadStatus}
                      onChange={(e) => setUploadStatus(e.target.value)}
                      label="Status"
                      sx={{
                        backgroundColor: '#1a1a1a',
                        color: '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333333' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D4AF37' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D4AF37' },
                      }}
                    >
                      <MenuItem value="Live">Live</MenuItem>
                      <MenuItem value="Old">Old</MenuItem>
                      <MenuItem value="Archive">Archive</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#999999' }}>Source</InputLabel>
                    <Select
                      value={uploadSource}
                      onChange={(e) => setUploadSource(e.target.value)}
                      label="Source"
                      sx={{
                        backgroundColor: '#1a1a1a',
                        color: '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333333' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D4AF37' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D4AF37' },
                      }}
                    >
                      <MenuItem value="Manual">Manual</MenuItem>
                      <MenuItem value="Confluence">Confluence</MenuItem>
                      <MenuItem value="MKDocs">MKDocs</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Version"
                    value={uploadVersion}
                    onChange={(e) => setUploadVersion(e.target.value)}
                    placeholder="1.0"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#1a1a1a',
                        color: '#ffffff',
                        '& fieldset': {
                          borderColor: '#333333',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D4AF37',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#D4AF37',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#999999',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#D4AF37',
                      },
                    }}
                  />
                </Box>
              )}

              {/* Upload Progress */}
              {isUploading && uploadStage === 'upload' && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                      Uploading documents...
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#999999' }}>
                      {uploadProgress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#333333',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#D4AF37',
                      },
                    }}
                  />
                </Box>
              )}

              {/* Indexing Progress */}
              {isIndexing && uploadStage === 'indexing' && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                      Indexing documents for AI search...
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#999999' }}>
                      {indexingProgress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={indexingProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#333333',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#4A7C59',
                      },
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#666666', display: 'block', mt: 1 }}>
                    Extracting text, analyzing content, and building search index...
                  </Typography>
                </Box>
              )}

              {/* Success Message */}
              {!isUploading && !isIndexing && uploadProgress === 100 && indexingProgress === 100 && (
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: '#1a3a1a',
                    border: '1px solid #4A7C59',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <CheckCircleIcon sx={{ color: '#4A7C59' }} />
                  <Typography variant="body2" sx={{ color: '#4A7C59' }}>
                    Documents uploaded and indexed successfully!
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ borderTop: '1px solid #333333', p: 2 }}>
            <Button onClick={handleCloseAddArticle} sx={{ color: '#999999' }} disabled={isUploading || isIndexing}>
              Cancel
            </Button>
            <Button
              onClick={simulateUpload}
              variant="contained"
              startIcon={isUploading || isIndexing ? <CircularProgress size={16} sx={{ color: '#1a1a1a' }} /> : <CloudUploadIcon />}
              sx={{ backgroundColor: '#D4AF37', color: '#1a1a1a' }}
              disabled={files.length === 0 || isUploading || isIndexing}
            >
              {isUploading ? 'Uploading...' : isIndexing ? 'Indexing...' : 'Upload & Index'}
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </Box>
  );
};

export default ConfigurationInterface;

