import {HashRouter,Routes,Route,Link,Navigate,useNavigate,useParams,useLocation} from 'react-router-dom';
import {TREE} from './data.js';
import {LangProvider,useL,Header,Footer,Breadcrumb,ServiceCard,SubcategoryCard,InformationCard,StepByStepGuide,Blocks,PreviousButton,HomeButton,Icon} from './ui.jsx';

function LanguagePage(){const {setLang}=useL();const nav=useNavigate();
 const pick=l=>{setLang(l);nav('/menu')};
 return <div className="center"><section className="language-panel"><Icon name="atm" size={30}/><h1>Select your language<br/>请选择语言</h1>
  <button className="btn big" onClick={()=>pick('en')}>English</button>
  <button className="btn big alt" onClick={()=>pick('zh')}>中文（简体）</button></section></div>}

function Menu(){const {t,u}=useL();
 return <><div className="hero"><h1>{u('menuTitle')}</h1><p>{u('menuSub')}</p></div>
  <div className="grid">{Object.entries(TREE.subs).map(([k,n])=><ServiceCard key={k} to={'/s/'+k} icon={n.icon} title={t(n.title)} desc={t(n.desc)}/>)}</div></>}

function Service(){const {t}=useL();const nav=useNavigate();const p=useParams()['*'];
 let node=TREE,path='/s',crumbs=[],parent='/menu';
 for(const s of p.split('/').filter(Boolean)){node=node?.subs?.[s];if(!node)return <Navigate to="/menu" replace/>;parent=path==='/s'?'/menu':path;path+='/'+s;crumbs.push({label:t(node.title),to:path});}
 if(node.redirectTo)return <Navigate to={node.redirectTo} replace/>;
 return <><Breadcrumb items={crumbs}/>
  <div className="title"><Icon name={node.icon} size={26}/><h1>{t(node.title)}</h1></div>
  {node.decision&&<InformationCard title={t(node.decision.q)}><button className="btn big" onClick={()=>nav(path+'/bca')}>{t(node.decision.yes)}</button><button className="btn big alt" onClick={()=>nav(path+'/other')}>{t(node.decision.no)}</button></InformationCard>}
  {node.subs&&!node.decision&&<div className="list">{Object.entries(node.subs).map(([k,n])=><SubcategoryCard key={k} to={path+'/'+k} icon={n.icon} title={t(n.title)} desc={t(n.desc)}/>)}</div>}
  {node.steps&&<StepByStepGuide steps={node.steps}/>}
  {node.blocks&&<InformationCard><Blocks blocks={node.blocks}/></InformationCard>}
  <div className="navbar"><PreviousButton fallback={parent}/>{node.extra&&<Link className="btn ghost" to={node.extra.to}>{t(node.extra.label)}</Link>}<HomeButton/></div></>}

function Shell(){const {lang}=useL();const {pathname}=useLocation();
 if(!lang&&pathname!=='/')return <Navigate to="/" replace/>;
 return <><Header/><main className="wrap"><Routes>
  <Route path="/" element={<LanguagePage/>}/><Route path="/menu" element={<Menu/>}/>
  <Route path="/s/*" element={<Service/>}/>
  <Route path="*" element={<Navigate to="/menu" replace/>}/></Routes></main><Footer/></>}

export default function App(){return <LangProvider><HashRouter><Shell/></HashRouter></LangProvider>}
