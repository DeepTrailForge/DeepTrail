if (typeof window !== 'undefined') {
  const originalError = console.error;
  const suppressedMessages = [
    'WalletConnectionError: Connection rejected',
    'Connection rejected',
    'User denied the request',
    'Transaction was not confirmed'
  ];

  console.error = (...args) => {
    const isSuppressed = args.some(arg =>
      typeof arg === 'string' && suppressedMessages.some(msg => arg.includes(msg))
    ) || args.some(arg =>
      typeof arg === 'object' && suppressedMessages.some(msg => arg?.toString?.()?.includes?.(msg))
    );

    if (isSuppressed) return;
    originalError.apply(console, args);
  };
}

export {};