import { Button } from './Button';
import { useGameStore } from '@/store/gameStore';
import { X } from 'lucide-react';

export function ModalPrompt() {
  const { 
    showModal, 
    modalType, 
    pendingAction,
    hideModal, 
    respond 
  } = useGameStore();
  
  if (!showModal) return null;
  
  const renderContent = () => {
    switch (modalType) {
      case 'response':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Response Required</h3>
            <p className="text-muted-foreground">
              Another player is attempting an action. How do you respond?
            </p>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                onClick={() => respond('allow')}
                className="flex-1"
              >
                Allow
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => respond('block')}
                className="flex-1"
              >
                Block
              </Button>
              <Button 
                variant="accent" 
                onClick={() => respond('challenge')}
                className="flex-1"
              >
                Challenge
              </Button>
            </div>
          </div>
        );
        
      case 'action':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Confirm Action</h3>
            <p className="text-muted-foreground">
              Are you sure you want to use {pendingAction}?
            </p>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                onClick={hideModal}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                variant="accent" 
                onClick={hideModal}
                className="flex-1"
              >
                Confirm
              </Button>
            </div>
          </div>
        );
        
      case 'reveal':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Choose Influence to Reveal</h3>
            <p className="text-muted-foreground">
              You must reveal one of your influence cards.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="destructive" 
                onClick={() => {/* TODO: implement */}}
                className="aspect-video"
              >
                Card 1
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {/* TODO: implement */}}
                className="aspect-video"
              >
                Card 2
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={hideModal}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-game-border rounded-2xl p-6 shadow-strong max-w-sm w-full">
        <button
          onClick={hideModal}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>
        
        {renderContent()}
      </div>
    </div>
  );
}