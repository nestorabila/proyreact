import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Clock3,
  FlaskConical,
  GraduationCap,
  Landmark,
  Menu,
  MonitorCog,
  Search,
  Stethoscope,
  Users,
  X,
} from 'lucide-react'

const programs = [
  {
    name: 'Ingeniería de Sistemas',
    faculty: 'Ingenierías',
    level: 'Pregrado',
    modality: 'Presencial',
    duration: '10 semestres',
    icon: MonitorCog,
    color: 'bg-[#dce8df]',
    accent: 'text-[#315b45]',
    description: 'Diseña soluciones digitales, desarrolla software y transforma organizaciones mediante la tecnología.',
  },
  {
    name: 'Administración de Empresas',
    faculty: 'Ciencias económicas',
    level: 'Pregrado',
    modality: 'Presencial',
    duration: '8 semestres',
    icon: BriefcaseBusiness,
    color: 'bg-[#e9dfcf]',
    accent: 'text-[#74552f]',
    description: 'Desarrolla capacidades para liderar empresas, proyectos y equipos con visión estratégica.',
  },
  {
    name: 'Medicina',
    faculty: 'Ciencias de la salud',
    level: 'Pregrado',
    modality: 'Presencial',
    duration: '12 semestres',
    icon: Stethoscope,
    color: 'bg-[#d7e5e8]',
    accent: 'text-[#2c5c65]',
    description: 'Forma profesionales comprometidos con la salud, la investigación y el bienestar comunitario.',
  },
  {
    name: 'Arquitectura',
    faculty: 'Artes y diseño',
    level: 'Pregrado',
    modality: 'Presencial',
    duration: '10 semestres',
    icon: Landmark,
    color: 'bg-[#eadbd5]',
    accent: 'text-[#7a4b3d]',
    description: 'Proyecta espacios innovadores con responsabilidad social, ambiental y cultural.',
  },
  {
    name: 'Maestría en Educación',
    faculty: 'Educación',
    level: 'Posgrado',
    modality: 'Virtual',
    duration: '4 semestres',
    icon: GraduationCap,
    color: 'bg-[#dadde9]',
    accent: 'text-[#4a5077]',
    description: 'Fortalece tu práctica docente con enfoques contemporáneos e investigación aplicada.',
  },
  {
    name: 'Biotecnología',
    faculty: 'Ciencias naturales',
    level: 'Pregrado',
    modality: 'Híbrida',
    duration: '10 semestres',
    icon: FlaskConical,
    color: 'bg-[#e1e4c9]',
    accent: 'text-[#62662d]',
    description: 'Investiga y crea soluciones sostenibles en salud, industria y protección ambiental.',
  },
]

const filters = ['Todos', 'Pregrado', 'Posgrado', 'Virtual']

function Logo({ inverse = false }) {
  return (
    <a href="#" className="flex items-center gap-3" aria-label="Universidad Aurora, inicio">
      <span className={`grid size-11 place-items-center rounded-full border ${inverse ? 'border-white/30 bg-white/10 text-white' : 'border-[#1d4d38]/15 bg-[#edf3ee] text-[#1d4d38]'}`}>
        <Landmark size={21} strokeWidth={1.8} />
      </span>
      <span>
        <span className={`block text-[15px] font-bold leading-none tracking-[0.08em] ${inverse ? 'text-white' : 'text-[#183629]'}`}>
          UNIVERSIDAD
        </span>
        <span className={`mt-1 block font-serif text-xl leading-none ${inverse ? 'text-[#d9e7de]' : 'text-[#4d694f]'}`}>
          Aurora
        </span>
      </span>
    </a>
  )
}

function ProgramCard({ program }) {
  const Icon = program.icon

  return (
    <article className="group overflow-hidden rounded-[22px] border border-[#dde3dc] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(35,75,52,0.10)]">
      <div className={`relative h-52 overflow-hidden ${program.color}`}>
        <div className="absolute -right-14 -top-14 size-52 rounded-full border border-white/50" />
        <div className="absolute -right-5 -top-5 size-36 rounded-full border border-white/60" />
        <div className="absolute bottom-[-70px] left-[-36px] size-44 rounded-full bg-white/25" />
        <span className={`absolute left-6 top-6 text-[11px] font-bold uppercase tracking-[0.16em] ${program.accent}`}>
          {program.faculty}
        </span>
        <div className="absolute bottom-6 left-1/2 grid size-24 -translate-x-1/2 place-items-center rounded-full bg-white/75 shadow-[0_12px_30px_rgba(44,70,54,0.12)] backdrop-blur-sm">
          <Icon size={42} strokeWidth={1.35} className={program.accent} />
        </div>
        <span className="absolute bottom-5 right-5 grid size-10 translate-y-2 place-items-center rounded-full bg-[#183629] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#718078]">
          <span>{program.level}</span>
          <span className="size-1 rounded-full bg-[#b7c1ba]" />
          <span>{program.modality}</span>
        </div>
        <h3 className="mt-3 min-h-14 text-[21px] font-semibold leading-tight tracking-[-0.035em] text-[#20372b]">
          {program.name}
        </h3>
        <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#68766f]">
          {program.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-[#edf0ed] pt-4">
          <span className="flex items-center gap-2 text-xs font-medium text-[#758179]">
            <Clock3 size={15} /> {program.duration}
          </span>
          <button type="button" className="flex items-center gap-1 text-sm font-bold text-[#315b45]">
            Ver programa <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [search, setSearch] = useState('')

  const visiblePrograms = programs.filter((program) => {
    const matchesFilter =
      activeFilter === 'Todos' ||
      program.level === activeFilter ||
      program.modality === activeFilter
    const matchesSearch =
      program.name.toLowerCase().includes(search.toLowerCase()) ||
      program.faculty.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f8f4] text-[#20372b]">
      <header className="relative z-30 border-b border-[#dde5de] bg-[#fbfcf8]/95">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
            <a href="#programas" className="text-sm font-semibold text-[#315b45]">Programas</a>
            <a href="#universidad" className="text-sm text-[#66756d] transition hover:text-[#315b45]">La universidad</a>
            <a href="#admision" className="text-sm text-[#66756d] transition hover:text-[#315b45]">Admisiones</a>
            <a href="#vida" className="text-sm text-[#66756d] transition hover:text-[#315b45]">Vida universitaria</a>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <button type="button" className="grid size-10 place-items-center rounded-full border border-[#dfe5df] text-[#59675f]">
              <Search size={17} />
            </button>
            <a href="#admision" className="inline-flex items-center gap-2 rounded-full bg-[#1d4d38] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#153927]">
              Postularme <ArrowUpRight size={16} />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-full border border-[#dfe5df] sm:hidden"
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-[#e5e9e4] px-5 py-4 sm:hidden" aria-label="Menú móvil">
            <div className="flex flex-col gap-4 text-sm font-semibold">
              <a href="#programas" onClick={() => setMenuOpen(false)}>Programas</a>
              <a href="#universidad" onClick={() => setMenuOpen(false)}>La universidad</a>
              <a href="#admision" onClick={() => setMenuOpen(false)}>Admisiones</a>
              <a href="#vida" onClick={() => setMenuOpen(false)}>Vida universitaria</a>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#edf3ec]">
          <div className="absolute left-[-180px] top-[-260px] size-[520px] rounded-full border border-[#cad8cc]" />
          <div className="absolute left-[-100px] top-[-180px] size-[360px] rounded-full border border-[#d7e1d8]" />
          <div className="absolute bottom-[-170px] right-[-100px] size-[420px] rounded-full border border-[#cad8cc]" />

          <div className="mx-auto grid min-h-[590px] max-w-[1280px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#58705f]">
                <span className="h-px w-8 bg-[#83988a]" />
                Inscripciones abiertas
              </div>
              <h1 className="mt-6 max-w-[650px] text-[clamp(3.4rem,7.2vw,6.5rem)] font-medium leading-[0.87] tracking-[-0.075em] text-[#183629]">
                Construye el futuro que
                <span className="mt-2 block font-serif font-normal italic text-[#657a58]">imaginas.</span>
              </h1>
              <p className="mt-7 max-w-lg text-base leading-7 text-[#66756d] sm:text-lg">
                Encuentra el programa académico que acompaña tus talentos, tus intereses y tus proyectos de vida.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#programas" className="inline-flex items-center gap-3 rounded-full bg-[#1d4d38] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#153927]">
                  Explorar programas <ArrowRight size={16} />
                </a>
                <a href="#admision" className="inline-flex items-center gap-2 rounded-full border border-[#bdc9c0] px-6 py-3.5 text-sm font-bold text-[#315b45] transition hover:border-[#315b45]">
                  Proceso de admisión
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-7 border-t border-[#ccd7ce] pt-6">
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.04em]">24</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7b8980]">Programas</p>
                </div>
                <span className="h-9 w-px bg-[#ccd7ce]" />
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.04em]">92%</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7b8980]">Graduación</p>
                </div>
                <span className="h-9 w-px bg-[#ccd7ce]" />
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.04em]">15 mil</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7b8980]">Graduados</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto h-[470px] w-full max-w-[470px]">
              <div className="absolute inset-4 rounded-[48%_48%_22px_22px] bg-[#cad8c6]" />
              <div className="absolute left-[12%] top-[10%] size-[76%] rounded-full border border-white/60" />
              <div className="absolute left-[20%] top-[18%] size-[60%] rounded-full border border-white/50" />
              <div className="absolute left-[31%] top-[25%] grid size-[38%] place-items-center rounded-full bg-[#f4f1df] shadow-[inset_-14px_-12px_30px_rgba(109,126,91,0.12)]">
                <GraduationCap size={78} strokeWidth={1.1} className="text-[#4d694f]" />
              </div>
              <div className="absolute bottom-9 left-0 rounded-2xl border border-white/60 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-[#e7eddf] text-[#315b45]">
                    <Award size={19} />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#315b45]">Educación de calidad</p>
                    <p className="mt-1 text-[11px] text-[#7a877f]">Acreditación institucional</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-16 right-0 grid size-24 place-items-center rounded-full bg-[#657a58] text-white shadow-xl">
                <Users size={34} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#dde4de] bg-[#fbfcf8]">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-12 gap-y-4 px-5 py-5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#7a867e] sm:px-8 lg:justify-between lg:px-10">
            <span className="flex items-center gap-2"><GraduationCap size={16} /> Formación integral</span>
            <span className="flex items-center gap-2"><FlaskConical size={16} /> Investigación aplicada</span>
            <span className="flex items-center gap-2"><Users size={16} /> Comunidad activa</span>
            <span className="flex items-center gap-2"><Landmark size={16} /> Impacto regional</span>
          </div>
        </section>

        <section id="programas" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#718078]">Oferta académica</p>
                <h2 className="mt-4 text-5xl font-medium leading-[0.95] tracking-[-0.065em] text-[#20372b] sm:text-6xl">
                  Encuentra tu <span className="font-serif font-normal italic text-[#657a58]">programa.</span>
                </h2>
              </div>
              <label className="flex h-12 w-full items-center gap-3 rounded-full border border-[#dce3dc] bg-white px-5 lg:w-[320px]">
                <Search size={17} className="text-[#7b8980]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9ba49e]"
                  placeholder="Buscar programa"
                />
              </label>
            </div>

            <div className="mt-9 flex flex-wrap gap-2 border-b border-[#dde4de] pb-5">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-5 py-2.5 text-xs font-bold transition ${
                    activeFilter === filter
                      ? 'bg-[#20372b] text-white'
                      : 'border border-[#dde3dc] bg-white text-[#718078] hover:border-[#91a398]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {visiblePrograms.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visiblePrograms.map((program) => (
                  <ProgramCard key={program.name} program={program} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-[#ccd6ce] py-16 text-center text-sm text-[#718078]">
                No encontramos programas con esos criterios.
              </div>
            )}
          </div>
        </section>

        <section id="admision" className="bg-[#20372b] px-5 py-16 text-white sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#bbcbbf]">Admisiones 2027</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-[1] tracking-[-0.055em] sm:text-5xl">
                Tu próxima etapa comienza con una decisión.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f3f5ef] px-6 py-3.5 text-sm font-bold text-[#20372b]">
                Ver requisitos <ArrowRight size={16} />
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white">
                Solicitar información
              </a>
            </div>
          </div>
        </section>

        <section id="universidad" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative min-h-[430px] overflow-hidden rounded-[28px] bg-[#dce4d7]">
              <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[#8e9d84]" />
              <div className="absolute bottom-0 left-[9%] h-[72%] w-[82%] rounded-t-[150px] bg-[#f2edda]" />
              <div className="absolute bottom-0 left-[20%] h-[51%] w-[60%] rounded-t-[110px] bg-[#b8c3a9]" />
              <div className="absolute bottom-0 left-[34%] h-[39%] w-[32%] rounded-t-[80px] bg-[#789078]" />
              <div className="absolute left-8 top-8 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#315b45]">
                Campus principal
              </div>
              <div className="absolute bottom-8 right-8 grid size-20 place-items-center rounded-full bg-[#e9cfa8] text-[#315b45]">
                <Landmark size={36} strokeWidth={1.4} />
              </div>
            </div>

            <div className="lg:px-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#718078]">Una comunidad para crecer</p>
              <h2 className="mt-4 text-5xl font-medium leading-[0.95] tracking-[-0.065em] text-[#20372b]">
                Aprende, descubre y <span className="font-serif font-normal italic text-[#657a58]">trasciende.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#68766f]">
                Vivir la Universidad Aurora es acceder a experiencias que combinan excelencia académica,
                innovación y participación. Aquí encontrarás espacios para investigar, crear y construir tu futuro.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[#dde4de] p-5">
                  <CalendarDays size={20} className="text-[#657a58]" />
                  <p className="mt-4 text-sm font-bold">Calendario académico</p>
                  <p className="mt-1 text-xs leading-5 text-[#7a877f]">Fechas, actividades y eventos.</p>
                </div>
                <div id="vida" className="rounded-2xl border border-[#dde4de] p-5">
                  <Users size={20} className="text-[#657a58]" />
                  <p className="mt-4 text-sm font-bold">Vida universitaria</p>
                  <p className="mt-1 text-xs leading-5 text-[#7a877f]">Comunidades y experiencias.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#17271f] px-5 py-10 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Logo inverse />
          <nav className="flex flex-wrap gap-6 text-xs text-white/65" aria-label="Enlaces del pie de página">
            <a href="#">Estudiantes</a>
            <a href="#">Docentes</a>
            <a href="#">Egresados</a>
            <a href="#">Contacto</a>
          </nav>
          <p className="text-xs text-white/45">© 2027 Universidad Aurora</p>
        </div>
      </footer>
    </div>
  )
}
