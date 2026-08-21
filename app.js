const chapters = [
  { id: 'setup', number: '01', title: '环境安装', time: '25 分钟', description: '安装 JDK 21，理解 JVM / JRE / JDK，并让终端与 IntelliJ 都认得 Java。' },
  { id: 'basics', number: '02', title: 'Java 最小集', time: '35 分钟', description: '只掌握看懂 Todo 项目所需的类、接口、集合、枚举、record 与异常。' },
  { id: 'spring', number: '03', title: 'Spring Boot', time: '40 分钟', description: '沿着 GET /api/tasks 走一遍 Controller → Service → Repository → H2。' },
  { id: 'launch', number: '04', title: '启动实验室', time: '30 分钟', description: '命令行、IntelliJ、jar 三种方式启动，知道每条日志和每个失败意味着什么。' },
  { id: 'todo', number: '05', title: 'Todo 实战', time: '60 分钟', description: '用真实 Todo API 串起 DTO、校验、业务层、持久化、异常与测试。' },
  { id: 'map', number: '06', title: '公司项目地图', time: '25 分钟', description: '把单模块项目映射到 Java 8 / Spring Boot 2 多模块结构。' },
];
const glossary = [
  ['JVM', '执行 Java 字节码的虚拟机。'], ['JDK', '包含编译器、运行时与开发工具。'], ['Maven', 'Java 依赖管理和构建工具，核心配置是 pom.xml。'], ['Bean', '由 Spring 容器创建、连接并管理的对象。'], ['IoC', '控制反转：由容器负责组装对象依赖。'], ['DTO', '描述接口输入或输出的数据形状。'], ['Entity', '与数据库表映射的持久化对象。'], ['Repository', '负责持久化访问的代码层。'], ['Profile', '一组环境配置标识，例如 dev、test、prod。'], ['JAR', '可运行的 Java 应用制品。'], ['Annotation', '以 @ 开头的元数据。'], ['Classpath', 'JVM 寻找 class 与资源的路径集合。'],
];
const stateKey = 'java-field-guide-progress';
let completed = JSON.parse(localStorage.getItem(stateKey) || '[]');

function render() {
  const completedCount = completed.length;
  const percent = Math.round((completedCount / chapters.length) * 100);
  document.querySelector('#progressValue').textContent = `${percent}%`;
  document.querySelector('#progressLabel').textContent = `${completedCount} / ${chapters.length} 个阶段完成`;
  document.querySelector('#progressBar').style.width = `${percent}%`;
  document.querySelector('#chapterNav').innerHTML = chapters.map(chapter => `<a class="chapter-link ${completed.includes(chapter.id) ? 'done' : ''}" href="#${chapter.id === 'launch' ? 'launch' : 'chapters'}"><span class="chapter-num">${completed.includes(chapter.id) ? '✓' : chapter.number}</span><div>${chapter.title}</div><span class="chapter-time">${chapter.time}</span></a>`).join('');
  document.querySelector('#chapterGrid').innerHTML = chapters.map(chapter => `<article class="chapter-card ${completed.includes(chapter.id) ? 'done' : ''}" id="${chapter.id}"><div class="card-top"><span>${chapter.number}</span><span class="${completed.includes(chapter.id) ? 'done-label' : ''}">${completed.includes(chapter.id) ? 'DONE' : chapter.time}</span></div><h3>${chapter.title}</h3><p>${chapter.description}</p><div class="card-bottom"><span>${completed.includes(chapter.id) ? '已完成' : '进入现场'}</span><button class="complete-button" data-id="${chapter.id}" type="button">${completed.includes(chapter.id) ? '撤销' : '标记完成'}</button></div></article>`).join('');
  document.querySelectorAll('.complete-button').forEach(button => button.addEventListener('click', () => { const id = button.dataset.id; completed = completed.includes(id) ? completed.filter(item => item !== id) : [...completed, id]; localStorage.setItem(stateKey, JSON.stringify(completed)); render(); }));
}

document.querySelector('#glossaryGrid').innerHTML = glossary.map(([term, description]) => `<article class="glossary-item"><code>${term}</code><p>${description}</p></article>`).join('');
document.querySelector('#themeToggle').addEventListener('click', () => { document.body.classList.toggle('dark'); localStorage.setItem('java-field-guide-theme', document.body.classList.contains('dark') ? 'dark' : 'light'); });
if (localStorage.getItem('java-field-guide-theme') === 'dark') document.body.classList.add('dark');
render();
