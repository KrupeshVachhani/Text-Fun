import React, { useState, useEffect } from "react";
import { 
  ArrowDownUp, 
  CaseLower, 
  CaseUpper, 
  Copy, 
  RotateCcw, 
  Type, 
  Hash, 
  Clock, 
  Shuffle, 
  AlignJustify, 
  Sparkles,
  Volume2,
  ChevronDown
} from "lucide-react";
import { 
  Container, 
  Navbar, 
  Nav, 
  Form, 
  Button, 
  Card, 
  Row, 
  Col, 
  Badge, 
  ButtonGroup,
  ButtonToolbar,
  Accordion,
  Dropdown,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Custom NavBar Component
const NavigationBar = () => (
  <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
    <Container>
      <Navbar.Brand href="#" className="fw-bold">TextFun</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav" className="justify-content-end">
        <Nav className="ml-auto">
          <Nav.Link href="#" active>Home</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default function TextPlayground() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [speechVoice, setSpeechVoice] = useState(null);
  const [availableVoices, setAvailableVoices] = useState([]);
  
  // Set up speech synthesis
  useEffect(() => {
    const voices = window.speechSynthesis?.getVoices() || [];
    setAvailableVoices(voices);
    
    // Update voices when they change
    const voicesChanged = () => {
      setAvailableVoices(window.speechSynthesis?.getVoices() || []);
    };
    
    window.speechSynthesis?.addEventListener('voiceschanged', voicesChanged);
    
    return () => {
      window.speechSynthesis?.removeEventListener('voiceschanged', voicesChanged);
    };
  }, []);

  useEffect(() => {
    // Select default voice when available
    if (availableVoices.length > 0 && !speechVoice) {
      setSpeechVoice(availableVoices[0]);
    }
  }, [availableVoices, speechVoice]);
  
  // Save state to history when text changes
  useEffect(() => {
    if (text && history[history.length - 1] !== text) {
      setHistory(prev => [...prev.slice(0, historyIndex + 1), text]);
      setHistoryIndex(prev => prev + 1);
    }
  }, [text]);

  // Functions for text manipulation
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const transformText = (transformer) => {
    if (!text.trim()) return;
    setText(transformer(text));
  };

  const toUpperCase = () => transformText(text => text.toUpperCase());
  const toLowerCase = () => transformText(text => text.toLowerCase());
  
  const alternateCaps = () => {
    transformText(text => {
      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (i % 2 === 0) {
          result += text.charAt(i).toUpperCase();
        } else {
          result += text.charAt(i).toLowerCase();
        }
      }
      return result;
    });
  };
  
  const reverseText = () => {
    transformText(text => text.split("").reverse().join(""));
  };
  
  const removeExtraSpaces = () => {
    transformText(text => text.replace(/\s+/g, " ").trim());
  };
  
  const capitalizeWords = () => {
    transformText(text => {
      return text
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    });
  };
  
  const scrambleWords = () => {
    transformText(text => {
      return text
        .split(" ")
        .map(word => {
          if (word.length <= 2) return word;
          
          const firstChar = word.charAt(0);
          const lastChar = word.charAt(word.length - 1);
          const middleChars = word.slice(1, -1).split("");
          
          // Shuffle middle characters
          for (let i = middleChars.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [middleChars[i], middleChars[j]] = [middleChars[j], middleChars[i]];
          }
          
          return firstChar + middleChars.join("") + lastChar;
        })
        .join(" ");
    });
  };
  
  const copyText = () => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };
  
  const resetText = () => {
    setText("");
    setHistory([]);
    setHistoryIndex(-1);
  };
  
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setText(history[historyIndex - 1]);
    }
  };
  
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setText(history[historyIndex + 1]);
    }
  };

  const speakText = () => {
    if (!text || !window.speechSynthesis) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    if (speechVoice) {
      utterance.voice = speechVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceChange = (e) => {
    const selectedVoice = availableVoices.find(voice => voice.name === e.target.value);
    if (selectedVoice) {
      setSpeechVoice(selectedVoice);
    }
  };
  
  // Text analytics functions
  const getWordCount = () => text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const getCharCount = () => text.length;
  const getCharCountNoSpaces = () => text.replace(/\s+/g, "").length;
  const getReadingTime = () => Math.max(1, Math.ceil(getWordCount() / 225));
  const getSentenceCount = () => {
    if (!text.trim()) return 0;
    return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
  };
  
  // Create tooltips for buttons
  const renderTooltip = (props, text) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );
  
  return (
    <div className="min-vh-100 bg-light">
      <NavigationBar />
      
      <Container className="py-4">
        <Card className="shadow mb-4">
          <Card.Header className="bg-primary text-white">
            <h2 className="h4 mb-0">Text Playground</h2>
          </Card.Header>
          
          <Card.Body>
            <Form.Group className="mb-4">
              <Form.Control
                as="textarea"
                rows={6}
                value={text}
                onChange={handleChange}
                placeholder="Enter your text here..."
                className="mb-3"
                style={{ fontSize: '1.1rem' }}
              />
            </Form.Group>
            
            <h5 className="mb-3">Text Transformations</h5>
            <Row className="g-2 mb-4">
              <Col xs={6} md={4} lg={3}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, "Convert to uppercase")}
                >
                  <Button variant="primary" className="w-100 d-flex align-items-center justify-content-center" onClick={toUpperCase}>
                    <CaseUpper size={18} className="me-2" /> Uppercase
                  </Button>
                </OverlayTrigger>
              </Col>
              
              <Col xs={6} md={4} lg={3}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, "Convert to lowercase")}
                >
                  <Button variant="primary" className="w-100 d-flex align-items-center justify-content-center" onClick={toLowerCase}>
                    <CaseLower size={18} className="me-2" /> Lowercase
                  </Button>
                </OverlayTrigger>
              </Col>
              
              <Col xs={6} md={4} lg={3}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, "Alternate case (e.g., AlTeRnAtE)")}
                >
                  <Button variant="primary" className="w-100 d-flex align-items-center justify-content-center" onClick={alternateCaps}>
                    <ArrowDownUp size={18} className="me-2" /> AlTeRnAtE
                  </Button>
                </OverlayTrigger>
              </Col>
              
              <Col xs={6} md={4} lg={3}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, "Capitalize each word")}
                >
                  <Button variant="primary" className="w-100 d-flex align-items-center justify-content-center" onClick={capitalizeWords}>
                    <Type size={18} className="me-2" /> Capitalize
                  </Button>
                </OverlayTrigger>
              </Col>
              
              <Col xs={6} md={4} lg={3}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, "Reverse the text")}
                >
                  <Button variant="primary" className="w-100 d-flex align-items-center justify-content-center" onClick={reverseText}>
                    <RotateCcw size={18} className="me-2" /> Reverse
                  </Button>
                </OverlayTrigger>
              </Col>
              
              <Col xs={6} md={4} lg={3}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, "Remove extra spaces")}
                >
                  <Button variant="primary" className="w-100 d-flex align-items-center justify-content-center" onClick={removeExtraSpaces}>
                    <AlignJustify size={18} className="me-2" /> Fix Spacing
                  </Button>
                </OverlayTrigger>
              </Col>
              
              <Col xs={6} md={4} lg={3}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, "Scramble letters within words")}
                >
                  <Button variant="primary" className="w-100 d-flex align-items-center justify-content-center" onClick={scrambleWords}>
                    <Shuffle size={18} className="me-2" /> Scramble
                  </Button>
                </OverlayTrigger>
              </Col>
              
              <Col xs={6} md={4} lg={3}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, "Text-to-speech")}
                >
                  <Button variant="primary" className="w-100 d-flex align-items-center justify-content-center" onClick={speakText}>
                    <Volume2 size={18} className="me-2" /> Speak
                  </Button>
                </OverlayTrigger>
              </Col>
              
              <Col xs={6} md={4} lg={3}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, "Copy to clipboard")}
                >
                  <Button variant="success" className="w-100 d-flex align-items-center justify-content-center" onClick={copyText}>
                    <Copy size={18} className="me-2" /> Copy
                  </Button>
                </OverlayTrigger>
              </Col>
              
              <Col xs={6} md={4} lg={3}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderTooltip(props, "Clear all text")}
                >
                  <Button variant="danger" className="w-100 d-flex align-items-center justify-content-center" onClick={resetText}>
                    <RotateCcw size={18} className="me-2" /> Reset
                  </Button>
                </OverlayTrigger>
              </Col>
            </Row>
            
            <div className="d-flex gap-2 mb-3 align-items-center">
              <ButtonGroup>
                <Button 
                  variant="outline-secondary" 
                  onClick={undo}
                  disabled={historyIndex <= 0}
                >
                  Undo
                </Button>
                <Button 
                  variant="outline-secondary" 
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                >
                  Redo
                </Button>
              </ButtonGroup>
              
              {window.speechSynthesis && (
                <div className="ms-auto d-flex align-items-center">
                  <Form.Label htmlFor="voice-select" className="me-2 mb-0">Voice:</Form.Label>
                  <Form.Select 
                    id="voice-select"
                    value={speechVoice?.name || ""}
                    onChange={handleVoiceChange}
                    style={{ width: 'auto' }}
                    size="sm"
                  >
                    {availableVoices.map(voice => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </Form.Select>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
        
        <Card className="shadow mb-4">
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
            <h2 className="h4 mb-0">Text Analysis</h2>
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="d-flex align-items-center"
            >
              {showAnalytics ? "Hide Details" : "Show Details"}
              <ChevronDown 
                size={16} 
                className={`ms-1 ${showAnalytics ? "rotate-180" : ""}`} 
                style={{ transform: showAnalytics ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              />
            </Button>
          </Card.Header>
          
          <Card.Body>
            <Row className="g-4 mb-4">
              <Col xs={6} md={3}>
                <Card className="bg-primary bg-opacity-10 h-100">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-3">
                    <div className="d-flex align-items-center mb-2 text-primary">
                      <Hash size={20} className="me-2" />
                      <h5 className="mb-0">Words</h5>
                    </div>
                    <h2 className="mb-0 fw-bold">{getWordCount()}</h2>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col xs={6} md={3}>
                <Card className="bg-primary bg-opacity-10 h-100">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-3">
                    <div className="d-flex align-items-center mb-2 text-primary">
                      <Type size={20} className="me-2" />
                      <h5 className="mb-0">Characters</h5>
                    </div>
                    <h2 className="mb-0 fw-bold">{getCharCount()}</h2>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col xs={6} md={3}>
                <Card className="bg-primary bg-opacity-10 h-100">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-3">
                    <div className="d-flex align-items-center mb-2 text-primary">
                      <Clock size={20} className="me-2" />
                      <h5 className="mb-0">Reading Time</h5>
                    </div>
                    <h2 className="mb-0 fw-bold">{getReadingTime()} min</h2>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col xs={6} md={3}>
                <Card className="bg-primary bg-opacity-10 h-100">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-3">
                    <div className="d-flex align-items-center mb-2 text-primary">
                      <Sparkles size={20} className="me-2" />
                      <h5 className="mb-0">Sentences</h5>
                    </div>
                    <h2 className="mb-0 fw-bold">{getSentenceCount()}</h2>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            {showAnalytics && (
              <Accordion defaultActiveKey="0" className="mb-3">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Additional Statistics</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md={6}>
                        <Card className="bg-light">
                          <Card.Body>
                            <Card.Title className="h6">Character Count (no spaces)</Card.Title>
                            <Card.Text className="h4 fw-bold">{getCharCountNoSpaces()}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      <Col md={6}>
                        <Card className="bg-light">
                          <Card.Body>
                            <Card.Title className="h6">Paragraphs</Card.Title>
                            <Card.Text className="h4 fw-bold">
                              {text ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </Card.Body>
        </Card>
        
        <Card className="shadow">
          <Card.Header className="bg-primary text-white">
            <h2 className="h4 mb-0">Preview</h2>
          </Card.Header>
          
          <Card.Body>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Original Text</Accordion.Header>
                <Accordion.Body className="bg-light">
                  {text || <span className="text-muted">Your text will appear here</span>}
                </Accordion.Body>
              </Accordion.Item>
              
              <Accordion.Item eventKey="1">
                <Accordion.Header>Uppercase</Accordion.Header>
                <Accordion.Body className="bg-light">
                  {text ? text.toUpperCase() : <span className="text-muted">Uppercase preview</span>}
                </Accordion.Body>
              </Accordion.Item>
              
              <Accordion.Item eventKey="2">
                <Accordion.Header>Lowercase</Accordion.Header>
                <Accordion.Body className="bg-light">
                  {text ? text.toLowerCase() : <span className="text-muted">Lowercase preview</span>}
                </Accordion.Body>
              </Accordion.Item>
              
              <Accordion.Item eventKey="3">
                <Accordion.Header>Capitalized Words</Accordion.Header>
                <Accordion.Body className="bg-light">
                  {text ? text.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ") : <span className="text-muted">Capitalized preview</span>}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>
        
        <div className="text-center mt-4 text-muted">
          <p>TextWizard &copy; {new Date().getFullYear()} - Your text transformation tool</p>
        </div>
      </Container>
    </div>
  );
}