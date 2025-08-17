import { useParams } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { Lobby } from '@/components/Lobby';
import { Table } from '@/components/Table';
import { ModalPrompt } from '@/components/ModalPrompt';

export default function Room() {
  const { roomId } = useParams<{ roomId: string }>();
  const { gameState, roomId: currentRoomId } = useGameStore();
  
  // Redirect if accessing wrong room
  if (roomId !== currentRoomId) {
    return (
      <div className="min-h-screen bg-game-surface flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Room Not Found</h1>
          <p className="text-muted-foreground">This room doesn't exist or you don't have access.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-game-surface">
      {gameState === 'lobby' && <Lobby />}
      {gameState === 'active' && <Table />}
      <ModalPrompt />
    </div>
  );
}