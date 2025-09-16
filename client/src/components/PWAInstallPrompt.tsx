import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    console.log('PWA Install Prompt: Component mounted');
    
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    console.log('PWA Install Prompt: isStandalone =', isStandalone, 'isInWebAppiOS =', isInWebAppiOS);
    
    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true);
      setDebugInfo('App already installed');
      console.log('PWA Install Prompt: App already installed');
      return;
    }

    // Check if user has already dismissed the prompt
    const hasBeenDismissed = localStorage.getItem('pwa-install-dismissed');
    console.log('PWA Install Prompt: hasBeenDismissed =', hasBeenDismissed);
    
    // For testing purposes, clear the dismissed flag and show prompt
    localStorage.removeItem('pwa-install-dismissed');
    
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('PWA Install Prompt: beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
      setDebugInfo('Native install prompt available');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detect browser and OS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isChrome = /Chrome/.test(navigator.userAgent);
    const isEdge = /Edg/.test(navigator.userAgent);
    
    console.log('PWA Install Prompt: Browser detection - iOS:', isIOS, 'Safari:', isSafari, 'Chrome:', isChrome, 'Edge:', isEdge);
    
    // Show prompt for all browsers after a short delay for testing
    setTimeout(() => {
      if (!showPrompt && !isInstalled) {
        console.log('PWA Install Prompt: Showing fallback prompt');
        setShowPrompt(true);
        setDebugInfo(`Browser: ${navigator.userAgent.substring(0, 50)}...`);
      }
    }, 2000); // Show after 2 seconds

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [showPrompt, isInstalled]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      
      setDeferredPrompt(null);
    } else {
      // For iOS Safari, show instructions
      alert('To install this app on your iOS device, tap the Share button and then "Add to Home Screen".');
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (isInstalled || !showPrompt) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 relative z-40">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">
              Install Heaven of Munroe App
            </p>
            <p className="text-xs text-blue-100">
              Get faster access and offline features
            </p>
            {debugInfo && (
              <p className="text-xs text-yellow-200 mt-1">
                Debug: {debugInfo}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleInstallClick}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Install</span>
          </button>
          
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Dismiss install prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}