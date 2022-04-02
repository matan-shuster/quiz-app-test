const ErrorMessage = ({ children }) => {
  return (
    <div style={
      {
          width: '100%',
          padding: 10,
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: 4,
          textAlign: 'center',
          marginBottom: 10
      }
    }>
      {children}
    </div>
  );
};

export default ErrorMessage;