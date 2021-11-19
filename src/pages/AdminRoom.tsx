import { useParams, useNavigate } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode'
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import deleteImg from '../assets/images/delete.svg';
import noQuestionsImg from '../assets/images/empty-questions.svg';

import '../styles/room.scss'
import { auth, database } from '../services/firebase';

export function AdminRoom() {

  // const { user } = useAuth();

  const navigate = useNavigate()

  const params = useParams() as any;
  const roomId = params.id;

  const {title, questions} = useRoom(roomId);

  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    navigate(`/`, {replace: true})
  }

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Tem certeza que deseja excluir esta pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleSignOut(){
    await auth.signOut();
    navigate(`/`, {replace: true});
    
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button 
              isOutlined
              onClick={handleEndRoom}
            >
              Encerrar sala
            </Button>
            <Button 
              isDanger
              onClick={handleSignOut}
            >
              Sair
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>{title.indexOf('Sala') ? 'Sala ' : ''}{title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
          
        </div>

        <div className="question-list">
          {questions.length === 0 ? 
            <div className="no-questions">
              <img src={noQuestionsImg} alt="Nenhuma pergunta por aqui"/> 
              <span>Nenhuma pergunta por aqui ainda :(</span>
            </div>
            : ''}
          {
          questions.map(question => {
            return (
              <Question 
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })
          }
        </div>
      </main>
    </div>
  )
}

