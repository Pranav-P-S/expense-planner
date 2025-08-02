// src/components/ProgressBar.jsx
function ProgressBar({ value, max }) {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  let color = '#4caf50'; // Green

  if (percentage >= 100) {
    color = '#f44336'; // Red
  } else if (percentage >= 80) {
    color = '#ff9800'; // Orange
  }

  return (
    <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
      <div
        style={{
          width: `${Math.min(percentage, 100)}%`, // Cap at 100% width
          backgroundColor: color,
          height: '20px',
          borderRadius: '4px',
          textAlign: 'center',
          color: 'white',
          lineHeight: '20px'
        }}
      >
        {Math.round(percentage)}%
      </div>
    </div>
  );
}
export default ProgressBar;