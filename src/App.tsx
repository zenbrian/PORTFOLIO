import { motion } from 'motion/react'
import { ArrowRight, Award, BriefcaseBusiness, Check, GitBranch, GraduationCap, HousePlug, Mail, MapPin, Menu, Network, Phone, Route, Server, ShieldCheck, X } from 'lucide-react'
import { useState, useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import './App.css'
import portrait from '../portrait.png'
import travelVideo from '../Travel_Digest_AI.mp4'

const projects = [
    { n: '01', title: 'Travel Digest AI', label: 'AI 旅遊應用', icon: Route, text: '將散落的旅遊攻略轉換成可執行行程。以多視角管理、Google 地圖同步與路線最佳化，重新設計旅程規劃流程。', points: ['AI 旅遊應用', 'TSP 路線最佳化', 'Kanban・Timeline・Map'], stack: ['Google Maps Platform'], video: travelVideo },
    { n: '02', title: 'Flow Analysis Agent Skill', label: 'Agent 自動化', icon: Network, text: '賦予 AI Agent 解析 mitmproxy 流量檔的能力，自動拆解 API 流程、驗證狀態與複雜 Cookie，產出可實作的逆向規格。', points: ['HTTP / HTTPS 流量結構化', '登入與電商流程分析', '轉換為 Headless API 規格'], stack: ['Agent Skill', 'mitmproxy', 'API Reverse'], href: 'https://github.com/zenbrian/mitmproxy-Flow-Analysis-AgentSkill/tree/main/mitmproxy-flow-analysis' },
    { n: '03', title: 'High-Concurrency Course System', label: '後端系統', icon: Server, text: '以 Go 與 React 打造高併發選課系統，透過 Redis 原子預檢與 PostgreSQL 行級鎖，在高負載下維持零超賣與強一致性。', points: ['高併發處裡', 'Redis 預檢'], stack: ['Go', 'Chi', 'PostgreSQL', 'Redis'], href: 'https://github.com/zenbrian/select-course' },
    { n: '04', title: 'Local AI Smart Home', label: 'Edge AI・IoT', icon: HousePlug, text: '結合小語言模型、MCP 與 Zigbee2MQTT 的在地端語音助理，以即時雙向音訊串流實現低延遲、隱私優先的設備控制。', points: ['WebSocket 即時語音', 'VAD・ASR・TTS Pipeline', 'MCP 動態工具調用'], stack: ['SLM', 'MCP', 'Zigbee2MQTT', 'WebSocket'], href: 'https://youtu.be/qbWzEjvoQUY', youtubeId: 'qbWzEjvoQUY' }
]

const skills = [
    ['Languages', ['Go', 'Python', 'TypeScript', 'JavaScript', 'C++', 'C#']],
    ['Backend & Data', ['FastAPI', '.NET', 'MySQL', 'PostgreSQL', 'Redis', 'REST API']],
    ['Tools & AI', ['Git', 'Docker', 'n8n', 'MCP', 'RAG', 'Power BI']]
]

const certs = [
    ['Google Cybersecurity', '2025'],
    ['n8n Certification Level 1 & 2', '2025'],
    ['PVQC 生活與資訊科技', '2024'],
    ['AI-900: Microsoft', '2023']
]

const getTagClass = (name: string) => 'tag-' + name.toLowerCase().replace(/[^a-z0-9]/g, '');

function Reveal({ children, className = '' }: { children: ReactNode, className?: string }) { return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .65 }}>{children}</motion.div> }
function Card({ children, className = '', onMouseMove, onMouseEnter, onMouseLeave }: { children: ReactNode, className?: string, onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void, onMouseEnter?: () => void, onMouseLeave?: () => void }) { const move = (e: MouseEvent<HTMLDivElement>) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`); e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`); if (onMouseMove) onMouseMove(e) }; return <div onMouseMove={move} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`card ${className}`}>{children}</div> }
function Title({ eyebrow, title, text }: { eyebrow: string, title: string, text?: string }) { return <Reveal className="heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</Reveal> }

function ProjectItem({ p }: { p: any }) {
    const [hover, setHover] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (p.video && videoRef.current) {
            if (hover) {
                videoRef.current.play().catch(e => console.log('play error', e));
            } else {
                videoRef.current.pause();
            }
        } else if (p.youtubeId && iframeRef.current) {
            const w = iframeRef.current.contentWindow;
            if (w) {
                if (hover) {
                    w.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
                } else {
                    w.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
                }
            }
        }
    }, [hover, p.video, p.youtubeId]);

    const I = p.icon;
    const card = (
        <Card
            className="project"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="project-details">
                <div className="project-top"><span>{p.n}</span><I /></div>
                <span className="label">{p.label}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <ul>{p.points.map((v: string) => <li key={v}><Check />{v}</li>)}</ul>
                <div className="project-foot">
                    <div>{p.stack.map((v: string) => <em key={v} className={getTagClass(v)}>{v}</em>)}</div>
                    {p.href && <ArrowRight />}
                </div>
            </div>
            {p.video && (
                <div className="project-video-wrap">
                    <video
                        ref={videoRef}
                        src={p.video}
                        loop
                        muted
                        playsInline
                        className="project-video"
                    />
                </div>
            )}
            {p.youtubeId && (
                <div className="project-video-wrap">
                    <iframe
                        ref={iframeRef}
                        src={`https://www.youtube.com/embed/${p.youtubeId}?enablejsapi=1&autoplay=0&mute=1&controls=0&loop=1&playlist=${p.youtubeId}`}
                        title={p.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="project-video"
                    />
                </div>
            )}
        </Card>
    );

    return p.href ? <a href={p.href} target="_blank" rel="noreferrer">{card}</a> : card;
}

function App() {
    const [menu, setMenu] = useState(false);
    return <div>
        <nav>
            <div className="nav-inner">
                <a className="brand" href="#top">任柏恩作品集<span>.</span></a>
                <div className={`links ${menu ? 'open' : ''}`}>
                    {[['首頁', '#top'], ['作品', '#projects'], ['經歷', '#experience'], ['技能', '#skills']].map(x => <a key={x[1]} href={x[1]} onClick={() => setMenu(false)}>{x[0]}</a>)}
                </div>
                <button aria-label="切換導覽選單" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
            </div>
        </nav>

        <main id="top">
            <section className="hero pad">
                <div className="grid" />
                <motion.div className="hero-inner" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
                    <div className="hero-main">
                        <h1>Hi, 我是<br /><strong>任柏恩</strong></h1>
                        <span className="role">Junior Engineer</span>
                        <p>我專注於 <b>AI Agent、後端系統與全端產品</b>，將複雜技術轉化為清楚、穩定且實用的數位體驗。</p>
                    </div>
                    <div className="portrait-column">
                        <div className="portrait-wrap">
                            <div className="portrait-shape" />
                            <img src={portrait} alt="任柏恩履歷與個人照片" />
                        </div>
                        <div className="basic-info">
                            <a href="mailto:zen.boen@gmail.com"><Mail /><span><small>Email</small>zen.boen@gmail.com</span></a>
                            <a href="https://github.com/zenbrian" target="_blank" rel="noreferrer"><GitBranch /><span><small>GitHub</small>github.com/zenbrian</span></a><div><MapPin /><span><small>Location</small>Taipei, Taiwan</span></div><div><GraduationCap /><span><small>Education</small>元智大學資訊管理學系</span></div></div></div></motion.div><div className="scroll-down-wrapper"><motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} className="scroll-down-icon"><div className="mouse-body"><span className="mouse-wheel" /></div></motion.div><span className="scroll-down-text">Scroll down</span></div></section>

            <section id="projects" className="pad">
                <Title eyebrow="01 / Selected work" title="精選專案" text="從在地端 AI 到高併發後端，每個專案都從一個清楚的問題開始。" />
                <div className="project-grid">
                    {projects.map((p, i) => (
                        <Reveal key={p.title} className={i === 0 || i === 3 ? 'wide' : ''}>
                            <ProjectItem p={p} />
                        </Reveal>
                    ))}
                </div>
            </section>

            <section id="experience" className="experience pad">
                <Title eyebrow="02 / Journey" title="經歷與學習" />
                <div className="timeline">
                    {[[BriefcaseBusiness, '2025 — NOW', 'Employment', '資策會數位轉型研究院', '數位李登輝', '建立 OCR 與資料結構化流程，進行 Embedding、Chunking 與向量資料庫整合；以 Neo4j 建構知識圖譜，並開發 FastAPI 與 n8n 自動化服務。'], [GraduationCap, '2022 — 2026', 'Education', '元智大學', '資訊管理學系', '專注程式設計、資料庫與系統分析。曾實作租屋管理資料庫與 Fraud Pattern Detection 決策支援系統。']].map(([I, time, k, n, r, d], idx) => (
                        <Reveal key={idx} className="timeline-row">
                            <time>{time as string}</time>
                            <I />
                            <div>
                                <span>{k as string}</span>
                                <h3>{n as string}</h3>
                                <h4>{r as string}</h4>
                                <p>{d as string}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section id="skills" className="skills pad">
                <Title eyebrow="03 / Capabilities" title="技術與認證" text="選擇合適工具，建立能夠持續演進的系統。" />
                <div className="skills-layout">
                    <div>
                        {skills.map(([t, items]) => (
                            <Reveal key={t as string} className="skill-row">
                                <h3>{t as string}</h3>
                                <div>
                                    {(items as string[]).map(v => <em key={v} className={getTagClass(v)}>{v}</em>)}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal className="credentials">
                        <h3><ShieldCheck /> Certifications</h3>
                        <div className="cert-list">
                            {certs.map(c => <div key={c[0]}><span>{c[0]}</span><time>{c[1]}</time></div>)}
                        </div>
                        <h3 className="comp-title"><Award /> Competition Experience</h3>
                        <div className="comp-list">
                            <div><span>AI Innovation Award</span><time>2025</time></div>
                            <div><span>資訊應用服務創新競賽</span><time>2025</time></div>
                            <div><span>育秀盃創意獎・捷運盃黑客松</span><time>2025</time></div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>

        <footer>
            <div><b>任柏恩</b><span>Junior Engineer</span></div>
            <div>
                <a href="mailto:zen.boen@gmail.com"><Mail /> Email</a>
                <a href="tel:+886969660078"><Phone /> Phone</a>
                <a href="https://github.com/zenbrian"><GitBranch /> GitHub</a>
            </div>
            <p><MapPin /> Taipei, Taiwan　© 2026</p>
        </footer>
    </div>
}

export default App