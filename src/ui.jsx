import {createContext,useContext,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {UserPlus,CreditCard,Landmark,Smartphone,UserCog,HelpCircle,Building2,User,Home,ChevronRight,ChevronLeft,Check,AlertTriangle,ShieldCheck,Headset,Info} from 'lucide-react';
import {UI,VERIFY} from './data.js';

const ICONS={'user-plus':UserPlus,card:CreditCard,atm:Landmark,phone:Smartphone,cog:UserCog,help:HelpCircle,building:Building2,user:User,alert:AlertTriangle};
const Ctx=createContext();
export const useL=()=>useContext(Ctx);
export function LangProvider({children}){
 const [lang,set]=useState(()=>{try{return localStorage.getItem('bca_lang')}catch{return null}});
 const setLang=l=>{set(l);try{localStorage.setItem('bca_lang',l)}catch{}};
 const t=o=>(o&&typeof o==='object'?o[lang||'en']:o);
 const u=k=>UI[k][lang||'en'];
 return <Ctx.Provider value={{lang,setLang,t,u}}>{children}</Ctx.Provider>;
}
export const Icon=({name,size=22})=>{const C=ICONS[name]||HelpCircle;return <span className="tile"><C size={size}/></span>};

export function LanguageSelector(){const {lang,setLang}=useL();
 return <div className="lang" role="group" aria-label="Language">{[['en','English'],['zh','中文']].map(([k,l])=><button key={k} className={lang===k?'on':''} onClick={()=>setLang(k)}>{l}</button>)}</div>}
export const HomeButton=()=>{const {u}=useL();return <Link className="btn ghost" to="/menu"><Home size={18}/>{u('home')}</Link>};
export function PreviousButton({fallback='/menu'}){const nav=useNavigate();const {u}=useL();
 const go=()=>window.history.state?.idx>0?nav(-1):nav(fallback,{replace:true});
 return <button className="btn ghost" onClick={go}><ChevronLeft size={18}/>{u('prev')}</button>}
export function Header(){const {u}=useL();
 return <header className="hdr"><div className="hdr-in">
  <Link to="/menu" className="brand"><img className="brand-logo" src="https://www.bca.co.id/-/media/Feature/Card/List-Card/Tentang-BCA/Brand-Assets/Logo-BCA/Logo-BCA_Biru.png" alt="BCA"/><span><b>{u('brand')}</b><small>{u('sub')}</small></span></Link>
  <LanguageSelector/></div></header>}
export const Footer=()=>{const {u}=useL();return <footer className="ftr"><p>{u('footer')}</p><p>{u('disclaimer')}</p></footer>};
export function Breadcrumb({items}){const {u}=useL();
 return <nav className="crumbs" aria-label="breadcrumb"><Link to="/menu">{u('home')}</Link>{items.map((c,i)=><span key={i}><ChevronRight size={14}/>{i<items.length-1?<Link to={c.to}>{c.label}</Link>:<b>{c.label}</b>}</span>)}</nav>}
export function ServiceCard({to,icon,title,desc}){return <Link to={to} className="svc"><Icon name={icon} size={26}/><b>{title}</b><small>{desc}</small></Link>}
export function SubcategoryCard({to,icon,title,desc}){return <Link to={to} className="sub"><Icon name={icon}/><span><b>{title}</b>{desc&&<small>{desc}</small>}</span><ChevronRight size={20}/></Link>}
export const InformationCard=({icon=<Info size={20}/>,title,children})=><section className="card info">{title&&<h3>{icon}{title}</h3>}{children}</section>;
export const WarningNotice=({children})=><div className="warn"><ShieldCheck size={20}/><div>{children}</div></div>;
export const DocumentChecklist=({items})=>{const {t}=useL();return <ul className="checklist">{items.map((i,k)=><li key={k}><span className="ck"><Check size={14}/></span>{t(i)}</li>)}</ul>};
function CheckGroup({items,hint}){const {t}=useL();const [s,set]=useState({}); // display-only, nothing stored or sent
 return <div>{items.map((i,k)=><label key={k} className="opt"><input type="checkbox" checked={!!s[k]} onChange={e=>set({...s,[k]:e.target.checked})}/><span>{t(i)}</span></label>)}<p className="hint">{t(hint)}</p></div>}
function RadioGroup({items}){const {t}=useL();const [selected,setSelected]=useState('');
 return <div>{items.map((item,index)=><label key={index} className="opt"><input type="radio" name="card-name-choice" value={index} checked={selected===String(index)} onChange={()=>setSelected(String(index))}/><span>{t(item)}</span></label>)}</div>}
function CheckOptions({options,selected,onChange}){const {t}=useL();
 return <div>{options.map(option=><label key={option.key} className="opt"><input type="checkbox" checked={!!selected[option.key]} onChange={()=>onChange(option.key)}/><span>{t(option.label)}</span></label>)}<p className="hint">{t({en:'Select all that apply',zh:'可多选'})}</p></div>}
function AccountProductSelector(){const {t}=useL();const [products,setProducts]=useState({});const [cards,setCards]=useState({});const [currencies,setCurrencies]=useState({});
 const productOptions=[{key:'tahapan',label:{en:'Tahapan',zh:'Tahapan'}},{key:'xpresi',label:{en:'Tahapan Xpresi',zh:'Tahapan Xpresi'}},{key:'dollar',label:{en:'BCA Dollar',zh:'BCA Dollar'}}];
 const cardOptions=[{key:'blue',label:{en:'Blue',zh:'Blue 蓝卡'}},{key:'gold',label:{en:'Gold',zh:'Gold 金卡'}},{key:'platinum',label:{en:'Platinum',zh:'Platinum 白金卡'}}];
 const currencyOptions=[{key:'usd',label:{en:'USD',zh:'USD 美元'}},{key:'sgd',label:{en:'SGD',zh:'SGD 新加坡元'}}];
 const toggle=(setter,key)=>setter(prev=>({...prev,[key]:!prev[key]}));
 const toggleProduct=key=>{const enabled=!products[key];setProducts(prev=>({...prev,[key]:enabled}));if(!enabled&&key==='tahapan')setCards({});if(!enabled&&key==='dollar')setCurrencies({})};
 const hasCard=Object.values(cards).some(Boolean);
 return <div className="account-options">
  <h4>{t({en:'Account products',zh:'账户产品'})}</h4>
  <CheckOptions options={productOptions} selected={products} onChange={toggleProduct}/>
  {products.tahapan&&<section className="conditional-options"><h4>{t({en:'Paspor BCA debit card options (for Tahapan ONLY)',zh:'Paspor BCA 借记卡选项（仅适用于 Tahapan）'})}</h4>
   <CheckOptions options={cardOptions} selected={cards} onChange={key=>toggle(setCards,key)}/>
   {hasCard&&<><h4>{t({en:'Would you like your name printed on the card?',zh:'您希望在卡片上印上姓名吗？'})}</h4><RadioGroup items={[{en:'Yes, print my name',zh:'是，卡片上印姓名'},{en:'No, no name',zh:'否，不印姓名'}]}/>
    <div className="note">{t({en:'The card without a name is issued immediately. A card with your name will be ready in 7 business days; please return to the branch to collect it.',zh:'不印姓名的卡片可立即领取。印有姓名的卡片将在 7 个工作日后准备好，请返回网点领取。'})}</div></>}
  </section>}
  {products.dollar&&<section className="conditional-options"><h4>{t({en:'BCA Dollar currency',zh:'BCA Dollar 账户币种'})}</h4><CheckOptions options={currencyOptions} selected={currencies} onChange={key=>toggle(setCurrencies,key)}/></section>}
 </div>;
}
const Txt=({s})=>s.split('\n\n').map((x,i)=><p key={i}>{x}</p>);

function CardDetails(){const {lang}=useL();const zh=lang==='zh';const label=(en,cn)=>zh?cn:en;
 const idr=[
  [label('Monthly administration fee','每月管理费'),['Rp10,000','Rp15,000 (Mastercard)','Rp17,000 (Mastercard)','Rp20,000 (Mastercard)']],
  [label('Minimum initial deposit','最低初始存款'),['Rp50,000','Rp500,000','Rp500,000','Rp500,000']],
  [label('Minimum held balance','最低留存余额'),['Rp10,000','Rp50,000','Rp50,000','Rp50,000']],
  [label('ATM cash withdrawal (daily)','ATM 取现（日限额）'),['Rp10,000,000','Rp15,000,000','Rp15,000,000','Rp15,000,000']],
  [label('ATM cash deposit (daily)','ATM 存款（日限额）'),['Rp30,000,000','Rp50,000,000','Rp80,000,000','Rp100,000,000']],
  [label('Transfer to BCA (daily)','BCA 转账（日限额）'),['Rp50,000,000','Rp100,000,000','Rp125,000,000','Rp150,000,000']],
  [label('Transfer to other banks (daily)','跨行转账（日限额）'),['Rp20,000,000','Rp30,000,000','Rp40,000,000','Rp50,000,000']],
  [label('EDC debit purchases (daily)','EDC 借记消费（日限额）'),['Rp50,000,000','Rp100,000,000','Rp125,000,000','Rp150,000,000']],
 ];
 const dollar=[
  [label('Monthly administration fee','每月管理费'),['USD 1','SGD 2']],
  [label('Card issuance / replacement fee','制卡 / 补卡费用'),['USD 1.5','SGD 2']],
  [label('Minimum initial deposit','最低初始存款'),['USD 100','SGD 200']],
  [label('Minimum held balance','最低留存余额'),[label('None','无'),label('None','无')]],
  [label('ATM / cardless cash withdrawal (daily)','ATM / 无卡取现（日限额）'),[label('IDR equivalent of Rp15,000,000','等值 Rp15,000,000'),label('IDR equivalent of Rp15,000,000','等值 Rp15,000,000')]],
  [label('BCA transfer via ATM / m-BCA (daily)','ATM / m-BCA 转账至 BCA（日限额）'),[label('IDR equivalent of Rp100,000,000','等值 Rp100,000,000'),label('IDR equivalent of Rp100,000,000','等值 Rp100,000,000')]],
  [label('myBCA transfer to another BCA account (daily)','myBCA 转账至其他 BCA 账户（日限额）'),[label('IDR equivalent of Rp300,000,000','等值 Rp300,000,000'),label('IDR equivalent of Rp300,000,000','等值 Rp300,000,000')]],
  [label('myBCA transfer to own BCA account','myBCA 转账至本人 BCA 账户'),[label('No limit','不限额'),label('No limit','不限额')]],
  [label('KlikBCA transfer to BCA (daily)','KlikBCA 转账至 BCA（日限额）'),[label('IDR equivalent of Rp500,000,000','等值 Rp500,000,000'),label('IDR equivalent of Rp500,000,000','等值 Rp500,000,000')]],
 ];
 const renderTable=(caption,headers,rows)=><div className="table-wrap"><table><caption>{caption}</caption><thead><tr>{headers.map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{rows.map(([name,values])=><tr key={name}><th scope="row">{name}</th>{values.map((v,i)=><td key={i}>{v}</td>)}</tr>)}</tbody></table></div>;
 return <details className="card-details"><summary>{label('View account and card limits & fees','查看账户及卡片限额与费用')}</summary><div className="card-details-content">
  <p>{label('Daily limits below apply to transactions through BCA ATMs, EDC, and m-BCA.','以下日限额适用于通过 BCA ATM、EDC 和 m-BCA 进行的交易。')}</p>
  {renderTable(label('Rupiah savings: Tahapan and Xpresi','印尼盾储蓄：Tahapan 和 Xpresi'),[label('Feature / daily transaction','项目 / 每日交易'), 'Tahapan Xpresi','Paspor Blue','Paspor Gold','Paspor Platinum'],idr)}
  <p>{label('Paspor card issuance or replacement fee: Rp20,000. Digital channel limits can differ from card limits.','Paspor 卡制卡或补卡费用：Rp20,000。数字渠道的限额可能与卡片限额不同。')}</p>
  {renderTable(label('Foreign currency savings: BCA Dollar','外币储蓄：BCA Dollar'),[label('Feature / transaction','项目 / 交易'),'USD','SGD'],dollar)}
  <p>{label('myBCA daily transfers can be set up to Rp500,000,000 to BCA and Rp300,000,000 to other banks. KlikBCA combined daily transfer limit is Rp500,000,000.','myBCA 每日转账限额最高可设为转入 BCA Rp500,000,000、转入其他银行 Rp300,000,000。KlikBCA 每日转账合并限额为 Rp500,000,000。')}</p>
  <p>{label('For foreign customers without KITAS/KITAP, BCA terms state a minimum initial deposit of USD2,000 or equivalent.','对于没有 KITAS/KITAP 的外国客户，BCA 条款规定最低初始存款为 USD2,000 或等值金额。')}</p>
  <p className="card-details-sources">{label('Official BCA details: ','BCA 官方详情：')}<a href="https://www.bca.co.id/id/Individu/produk/simpanan/Tahapan" target="_blank" rel="noreferrer">Tahapan</a> · <a href="https://www.bca.co.id/xpresi" target="_blank" rel="noreferrer">Tahapan Xpresi</a> · <a href="https://www.bca.co.id/id/Individu/produk/simpanan/BCA-Dollar" target="_blank" rel="noreferrer">BCA Dollar</a> · <a href="https://www.bca.co.id/-/media/Files/2024/simpanan/2025/06/BCA-DOLLAR-IDS-0019A-C-2025-ID" target="_blank" rel="noreferrer">BCA Dollar terms</a> · <a href="https://www.bca.co.id/id/informasi/news-and-features/2026/08/04/17/45/informasi-kenaikan-limit-transfer-harian-di-mybca" target="_blank" rel="noreferrer">myBCA limits</a></p>
 </div></details>;
}

export function Blocks({blocks}){const {t,u}=useL();
 return blocks.map((b,i)=>{switch(b.k){
  case 'p':return <Txt key={i} s={t(b.t)}/>;
  case 'h':return <h4 key={i}>{t(b.t)}</h4>;
  case 'ul':return <ul key={i} className="ul">{b.items.map((x,j)=><li key={j}>{t(x)}</li>)}</ul>;
  case 'ol':return <ol key={i} className="ol">{b.items.map((x,j)=><li key={j}>{t(x)}</li>)}</ol>;
  case 'docs':return <DocumentChecklist key={i} items={b.items}/>;
  case 'note':return <div key={i} className="note">{t(b.t)}</div>;
  case 'warn':return <WarningNotice key={i}>{t(b.t)}</WarningNotice>;
  case 'cardDetails':return <CardDetails key={i}/>;
  case 'info':return <Txt key={i} s={t(b.t)}/>;
  case 'check':return <CheckGroup key={i} items={b.items} hint={b.hint}/>;
  case 'radio':return <RadioGroup key={i} items={b.items}/>;
  case 'accountOptions':return <AccountProductSelector key={i}/>;
  case 'ver':return <div key={i} className="ver"><h4>{u('verify')}</h4><p>{t(VERIFY.intro)}</p><ol className="ol">{VERIFY.items.map((x,j)=><li key={j}>{t(x)}</li>)}</ol><div className="note">{t(VERIFY.note)}</div></div>;
  default:return null}})}
export const StepByStepGuide=({steps})=>{const {t,u}=useL();const [current,setCurrent]=useState(0);const [completed,setCompleted]=useState(()=>new Set());
 const step=steps[current];const isComplete=completed.has(current);const isLast=current===steps.length-1;
 const markAndContinue=()=>{setCompleted(prev=>new Set(prev).add(current));if(!isLast)setCurrent(current+1)};
 return <div className="steps">
  <div className="step-progress"><span>{u('step')} {current+1} {u('stepOf')} {steps.length}</span><span>{completed.size}/{steps.length}</span></div>
  <div className="progress-track"><span style={{width:`${(completed.size/steps.length)*100}%`}}/></div>
  <section className="step-page card"><div className="sh"><span className={`num${isComplete?' done':''}`}>{isComplete?<Check size={22}/>:current+1}</span><div><small>{u('step')} {current+1}</small><h3>{t(step.t)}</h3></div></div><Blocks blocks={step.blocks}/>
   {isComplete&&<div className="step-success"><Check size={18}/>{u('stepCompleted')}</div>}
   <div className="step-controls"><button className="btn ghost" onClick={()=>setCurrent(current-1)} disabled={current===0}><ChevronLeft size={18}/>{u('previousStep')}</button><button className="btn" onClick={markAndContinue} disabled={isComplete&&isLast}>{u('continueStep')}</button></div>
   {completed.size===steps.length&&<div className="step-success all-done"><Check size={18}/>{u('allStepsComplete')}</div>}
  </section>
 </div>};
