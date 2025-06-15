const DialogBox = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Function to format the explanation text with better structure
  const formatExplanation = (text) => {
    if (typeof text !== 'string') return text;
    
    let formattedText = text
      // Clean up extra spaces
      .replace(/\s+/g, ' ')
      .trim();

    // First, convert markdown-style bold to HTML before other processing
    formattedText = formattedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Add line breaks for better readability
    formattedText = formattedText
      // Break after sentences that end with period and are followed by capital letter
      .replace(/\.\s+(?=[A-Z][a-z])/g, '.\n\n')
      // Break after numbered items
      .replace(/(\d+\.\s*<strong>[^<]+<\/strong>)/g, '\n$1\n')
      // Break before "Let's" phrases
      .replace(/(Let's\s+)/g, '\n\n$1')
      // Break before "Example:" or "In essence" or similar
      .replace(/(Example:|In essence|The algorithm)/g, '\n\n$1')
      // Break around table-like content
      .replace(/(\|\s*\w+\s*\|)/g, '\n$1')
      // Clean up multiple line breaks
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Split by paragraphs and format each
    const paragraphs = formattedText.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      paragraph = paragraph.trim();
      if (!paragraph) return null;
      
      // Check if this is a table row (contains pipes)
      if (paragraph.includes('|') && paragraph.includes('---')) {
        return (
          <div key={index} className="table-content bg-gray-50 border border-gray-200 rounded-md p-3 font-mono text-sm mb-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">{paragraph}</pre>
          </div>
        );
      }
      
      // Check if it's a pure code snippet (actual code, not explanation)
      // Look for patterns that indicate actual code rather than explanatory text
      const isPureCode = (
        // Check for common code patterns without explanatory text
        (/^(int|void|for|if|return|class|\w+\*)\s+\w+.*[;{}]$/.test(paragraph) ||
        /^[a-zA-Z_]\w*\s*[=\(].*[;\)]$/.test(paragraph)) &&
        !paragraph.includes('This') &&
        !paragraph.includes('represents') &&
        !paragraph.includes('function') &&
        paragraph.length < 100 && // Short lines are more likely to be code
        !paragraph.includes('<strong>')
      );
      
      if (isPureCode) {
        return (
          <div key={index} className="code-block bg-gray-100 border-l-4 border-blue-500 rounded-r-md p-3 font-mono text-sm mb-3 overflow-x-auto">
            <code>{paragraph}</code>
          </div>
        );
      }
      
      // Check if it's a numbered list item
      if (/^\d+\./.test(paragraph)) {
        return (
          <div key={index} className="numbered-item mb-4 pl-2">
            <div 
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: paragraph
                  .replace(/\n/g, '<br>')
                  // Handle inline code snippets within explanations
                  .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
              }} 
            />
          </div>
        );
      }
      
      // Check if it's a bullet point
      if (paragraph.startsWith('-')) {
        return (
          <div key={index} className="bullet-item ml-6 mb-3 relative">
            <div 
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: paragraph
                  .substring(1) // Remove the dash
                  .trim()
                  .replace(/\n/g, '<br>')
                  .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
              }} 
            />
          </div>
        );
      }
      
      // Regular paragraph with inline code handling
      return (
        <div key={index} className="paragraph mb-4 leading-relaxed text-gray-700">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: paragraph
                .replace(/\n/g, '<br>')
                // Handle inline code snippets within explanations
                .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
            }} 
          />
        </div>
      );
    }).filter(Boolean);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800">Code Explanation</h3>
          <button 
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium" 
            onClick={onClose}
          >
            Close
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="text-gray-800">
            {typeof children === 'string' ? (
              <div className="formatted-explanation">
                {formatExplanation(children)}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Loading explanation...</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Styles */}
      <style jsx>{`
        .formatted-explanation .inline-code {
          background-color: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: #dc2626;
          border: 1px solid #e2e8f0;
          font-weight: 500;
        }
        
        .formatted-explanation .code-block {
          background-color: #f8fafc;
        }
        
        .formatted-explanation .table-content {
          background-color: #f9fafb;
        }
        
        .formatted-explanation .numbered-item {
          counter-increment: item;
        }
        
        .formatted-explanation .bullet-item::before {
          content: '•';
          color: #6b7280;
          font-weight: bold;
          position: absolute;
          left: -1.2em;
          top: 0;
        }
        
        .formatted-explanation strong {
          color: #1f2937;
          font-weight: 600;
        }
        
        .formatted-explanation .paragraph {
          line-height: 1.7;
        }
        
        .formatted-explanation .numbered-item {
          position: relative;
        }
        
        .formatted-explanation h4 {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default DialogBox;