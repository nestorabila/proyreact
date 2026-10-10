import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Tooltip from '@radix-ui/react-tooltip'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Check,
  ChevronDown,
  Layers3,
  Menu,
  MousePointer2,
  PenTool,
  Sparkles,
  X,
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import { Link, Route, Routes } from 'react-router-dom'

const projects = [
  {
    name: 'Casa Nómada',
    category: 'Identidad',
    description: 'Una marca para sentirse en casa, estés donde estés.',
    year: '2025',
    background: 'from-[#f6a88e] via-[#ed795f] to-[#bd4d3e]',
    artwork: 'noma',
  },
  {
    name: 'Verde Vivo',
    category: 'Digital',
    description: 'Cultivar nuevos hábitos, un pequeño paso a la vez.',
    year: '2024',
    background: 'from-[#d5e2a5] via-[#a7bb78] to-[#67835d]',
    artwork: 'verde',
  },
  {
    name: 'Afuera Magazine',
    category: 'Editorial',
    description: 'Historias que empiezan cuando termina el camino.',
    year: '2024',
    background: 'from-[#d8b8e6] via-[#aa82cb] to-[#705395]',
    artwork: 'afuera',
  },
]

const services = [
  { icon: PenTool, title: 'Identidad de marca', detail: 'Estrategia, voz y sistemas visuales' },
  { icon: MousePointer2, title: 'Diseño digital', detail: 'Webs, productos y experiencias' },
  { icon: Layers3, title: 'Dirección creativa', detail: 'Ideas con intención y personalidad' },
]

function Brand({ light = false }) {
  return (
    <Link
      className={`inline-flex items-center gap-2.5 text-lg font-extrabold tracking-[-0.07em] ${light ? 'text-white' : 'text-[#24231f]'}`}
      to="/"
      aria-label="Sur Estudio, inicio"
    >
      <span className="grid size-8 place-items-center rounded-full bg-[#f15e42] text-white">
        <Asterisk size={21} strokeWidth={2.5} />
      </span>
      sur<span className="-ml-2 text-[#f15e42]">.</span>
    </Link>
  )
}

function SectionEyebrow({ children, light = false }) {
  return (
    <div className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${light ? 'text-white/55' : 'text-[#77746c]'}`}>
      <span className="size-1.5 rounded-full bg-[#ef6548]" />
      {children}
    </div>
  )
}

function ProjectArtwork({ project }) {
  if (project.artwork === 'noma') {
    return (
      <div className="relative flex h-full min-h-72 items-center justify-center overflow-hidden">
        <div className="absolute -left-8 top-10 size-48 rounded-full border border-white/35" />
        <div className="absolute -left-3 top-[4.5rem] size-36 rounded-full border border-white/30" />
        <div className="absolute -right-10 bottom-[-5rem] size-64 rounded-full bg-[#f5c19e]/40 blur-[1px]" />
        <div className="relative rotate-[-7deg] rounded-sm bg-[#f6eee1] px-9 py-8 text-center shadow-2xl shadow-[#722f28]/20">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#806355]">Tu lugar, en todas partes</span>
          <div className="my-3 font-serif text-5xl leading-none tracking-[-0.08em] text-[#a84d3b]">nómada</div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#806355]">Casa · Viaje · Encuentro</span>
        </div>
      </div>
    )
  }

  if (project.artwork === 'verde') {
    return (
      <div className="relative flex h-full min-h-72 items-center justify-center overflow-hidden">
        <div className="absolute -left-9 top-10 size-52 rounded-full bg-[#e9edce]/65" />
        <div className="absolute -right-6 bottom-[-4rem] size-56 rounded-full bg-[#536e51]/25" />
        <div className="relative flex h-52 w-36 -rotate-3 flex-col justify-between rounded-[2rem] border-[5px] border-[#2e4236] bg-[#faf8ed] p-3 shadow-2xl shadow-[#34452f]/25">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-bold tracking-tight text-[#40533e]">verde vivo</span>
            <span className="size-2 rounded-full bg-[#ed7755]" />
          </div>
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#dfe8c8]">
            <span className="text-4xl">✳</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-16 rounded-full bg-[#798c68]/50" />
            <div className="h-1.5 w-11 rounded-full bg-[#798c68]/25" />
            <div className="mt-2 h-5 rounded-full bg-[#718760]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-full min-h-72 items-center justify-center overflow-hidden">
      <div className="absolute left-8 top-8 size-28 rounded-full border border-white/25" />
      <div className="absolute bottom-[-4rem] right-[-2rem] size-64 rounded-full bg-[#e4c9eb]/25" />
      <div className="relative w-52 rotate-[5deg] bg-[#f7f0e6] p-4 pb-7 shadow-2xl shadow-[#392e48]/25">
        <div className="flex items-center justify-between text-[7px] uppercase tracking-[0.2em] text-[#685778]">
          <span>Edición 04</span><span>2025</span>
        </div>
        <div className="my-5 flex h-28 items-center justify-center bg-[#e2d7e8]">
          <div className="size-20 rounded-full bg-[#bb9acb] shadow-[inset_-12px_-8px_0_#9878aa]" />
        </div>
        <div className="font-serif text-4xl leading-none tracking-[-0.07em] text-[#584368]">afuera</div>
        <div className="mt-2 text-[7px] uppercase tracking-[0.18em] text-[#685778]">Un lugar para perderse</div>
      </div>
    </div>
  )
}

function ContactDialog({ open, onOpenChange }) {
  const handleSubmit = async (event) => {
    event.preventDefault()
    onOpenChange(false)
    await Swal.fire({
      title: '¡Gracias por acercarte!',
      text: 'Esta demo todavía no envía mensajes. Escríbenos a hola@surestudio.co para empezar una conversación.',
      icon: 'success',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#ef6548',
    })
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-[#201d19]/55 backdrop-blur-sm" />
        <Dialog.Content className="dialog-card fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-[#fbfaf7] p-7 shadow-2xl outline-none sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="dialog-eyebrow">
                <SectionEyebrow>Hablemos</SectionEyebrow>
              </div>
              <Dialog.Title aria-label="¿Qué tienes en mente?" className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-[#24231f]">
                <span aria-hidden="true" className="inline-flex flex-wrap">
                  {Array.from('¿Qué tienes en mente?').map((letter, index) => (
                    <span key={`${letter}-${index}`} className="inline-block overflow-hidden pb-1">
                      <motion.span
                        className="inline-block"
                        initial={{ opacity: 0, y: '110%', rotateX: -70 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          duration: 0.42,
                          delay: 0.18 + index * 0.026,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {letter === ' ' ? '\u00a0' : letter}
                      </motion.span>
                    </span>
                  ))}
                </span>
              </Dialog.Title>
              <Dialog.Description className="dialog-description mt-2 text-sm leading-6 text-[#77746c]">
                Cuéntanos un poco y encontraremos el mejor lugar para empezar.
              </Dialog.Description>
            </div>
            <Dialog.Close className="dialog-close rounded-full p-2 text-[#77746c] transition hover:bg-black/5 hover:text-[#24231f]" aria-label="Cerrar">
              <X size={20} />
            </Dialog.Close>
          </div>
          <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
            <label className="dialog-form-item block text-sm font-medium text-[#3f3d37]">
              Tu nombre
              <input required name="name" className="mt-2 w-full rounded-xl border border-[#e6e2da] bg-white px-4 py-3 outline-none transition placeholder:text-[#aaa69d] focus:border-[#ef6548]" placeholder="¿Cómo te llamas?" />
            </label>
            <label className="dialog-form-item block text-sm font-medium text-[#3f3d37]">
              Tu correo
              <input required type="email" name="email" className="mt-2 w-full rounded-xl border border-[#e6e2da] bg-white px-4 py-3 outline-none transition placeholder:text-[#aaa69d] focus:border-[#ef6548]" placeholder="hola@tuempresa.com" />
            </label>
            <label className="dialog-form-item block text-sm font-medium text-[#3f3d37]">
              Cuéntanos tu idea
              <textarea required name="message" rows="3" className="mt-2 w-full resize-y rounded-xl border border-[#e6e2da] bg-white px-4 py-3 outline-none transition placeholder:text-[#aaa69d] focus:border-[#ef6548]" placeholder="Estamos pensando en..." />
            </label>
            <button type="submit" className="dialog-form-item mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ef6548] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#dd5038]">
              Enviar mensaje <ArrowRight size={16} />
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function StudioHome() {
  const [contactOpen, setContactOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Todos')
  const filters = ['Todos', 'Identidad', 'Digital', 'Editorial']
  const visibleProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter((project) => project.category === activeFilter)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hola@surestudio.co')
      toast.success('Correo copiado al portapapeles')
    } catch {
      toast.error('No pudimos copiarlo. Escríbenos a hola@surestudio.co')
    }
  }

  return (
    <Tooltip.Provider delayDuration={250}>
      <div className="overflow-hidden">
        <Toaster position="bottom-right" toastOptions={{ duration: 3500 }} />
        <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />

        <header className="absolute inset-x-0 top-0 z-20">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-14" aria-label="Navegación principal">
            <Brand />
            <div className="hidden items-center gap-9 md:flex">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="inline-flex items-center gap-1 text-sm text-[#55524b] transition hover:text-[#ef6548]">
                  Qué hacemos <ChevronDown size={14} />
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content align="start" sideOffset={12} className="z-30 w-72 rounded-2xl border border-[#eeeae2] bg-[#fbfaf7] p-2 shadow-xl shadow-black/10 outline-none data-[state=open]:animate-in data-[state=open]:fade-in">
                    {services.map(({ icon: Icon, title, detail }) => (
                      <DropdownMenu.Item key={title} asChild>
                        <a href="#servicios" className="flex cursor-pointer items-center gap-3 rounded-xl p-3 outline-none transition hover:bg-[#f3f0e9] focus:bg-[#f3f0e9]">
                          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f8e2dc] text-[#ef6548]"><Icon size={17} /></span>
                          <span><span className="block text-sm font-semibold text-[#282722]">{title}</span><span className="mt-0.5 block text-xs text-[#89857b]">{detail}</span></span>
                        </a>
                      </DropdownMenu.Item>
                    ))}
                    <DropdownMenu.Arrow className="fill-[#fbfaf7]" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
              <a href="#proyectos" className="text-sm text-[#55524b] transition hover:text-[#ef6548]">Proyectos</a>
              <a href="#estudio" className="text-sm text-[#55524b] transition hover:text-[#ef6548]">El estudio</a>
            </div>
            <button onClick={() => setContactOpen(true)} className="hidden items-center gap-2 rounded-full border border-[#dcd8cf] px-5 py-2.5 text-sm font-medium transition hover:border-[#ef6548] hover:bg-[#ef6548] hover:text-white md:inline-flex">
              Empezar un proyecto <ArrowUpRight size={15} />
            </button>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="grid size-10 place-items-center rounded-full border border-[#e5e0d7] text-[#282722] md:hidden" aria-label="Abrir menú">
                <Menu size={19} />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content align="end" sideOffset={10} className="z-30 w-52 rounded-2xl border border-[#eeeae2] bg-[#fbfaf7] p-2 shadow-xl outline-none">
                  <DropdownMenu.Item asChild><a href="#servicios" className="block rounded-xl px-3 py-2.5 text-sm text-[#3f3d37] outline-none hover:bg-[#f3f0e9]">Qué hacemos</a></DropdownMenu.Item>
                  <DropdownMenu.Item asChild><a href="#proyectos" className="block rounded-xl px-3 py-2.5 text-sm text-[#3f3d37] outline-none hover:bg-[#f3f0e9]">Proyectos</a></DropdownMenu.Item>
                  <DropdownMenu.Item asChild><a href="#estudio" className="block rounded-xl px-3 py-2.5 text-sm text-[#3f3d37] outline-none hover:bg-[#f3f0e9]">El estudio</a></DropdownMenu.Item>
                  <DropdownMenu.Separator className="my-1 h-px bg-[#eeeae2]" />
                  <DropdownMenu.Item onSelect={() => setContactOpen(true)} className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-semibold text-[#ef6548] outline-none hover:bg-[#f3f0e9]">Hablemos <ArrowUpRight className="ml-1 inline" size={14} /></DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </nav>
        </header>

        <main>
          <section className="relative flex min-h-[760px] items-center overflow-hidden bg-[#f1eee7] pt-24 sm:min-h-[820px]">
            <div className="absolute -right-36 top-24 size-[520px] rounded-full border border-[#dcd6c9] sm:right-[-5%] sm:size-[650px]" />
            <div className="absolute -right-20 top-40 size-[420px] rounded-full border border-[#e1dbd0] sm:right-[2%] sm:size-[510px]" />
            <div className="absolute right-[13%] top-[36%] size-3 rounded-full bg-[#ef6548]" />
            <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-20 pt-16 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14 lg:pb-28">
              <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="relative z-10">
                <SectionEyebrow>Estudio creativo independiente · Bogotá & en todas partes</SectionEyebrow>
                <h1 className="mt-8 max-w-3xl text-[clamp(3.6rem,9vw,7.6rem)] font-medium leading-[0.88] tracking-[-0.09em] text-[#24231f]">
                  Ideas con <span className="font-serif font-normal italic text-[#ef6548]">alma.</span><br />
                  Marcas con<br />algo que decir<span className="text-[#ef6548]">.</span>
                </h1>
                <p className="mt-7 max-w-md text-base leading-7 text-[#77746c] sm:text-lg sm:leading-8">
                  Somos un estudio pequeño para ideas grandes. Creamos identidades y experiencias digitales que conectan de verdad.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button onClick={() => setContactOpen(true)} className="group inline-flex items-center gap-3 rounded-full bg-[#24231f] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#ef6548]">
                    Cuéntanos tu idea <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <a href="#proyectos" className="inline-flex items-center gap-2 px-3 py-3 text-sm font-medium text-[#55524b] transition hover:text-[#ef6548]">
                    Ver proyectos <ArrowDown size={15} />
                  </a>
                </div>
                <div className="mt-12 flex items-center gap-3 text-xs text-[#77746c]">
                  <span className="flex -space-x-2">
                    <span className="grid size-8 place-items-center rounded-full border-2 border-[#f1eee7] bg-[#e9b9a6] font-serif text-[#754438]">s.</span>
                    <span className="grid size-8 place-items-center rounded-full border-2 border-[#f1eee7] bg-[#bdc8a6] font-serif text-[#42523c]">m.</span>
                    <span className="grid size-8 place-items-center rounded-full border-2 border-[#f1eee7] bg-[#d6bfdf] font-serif text-[#59426b]">l.</span>
                  </span>
                  <span>Un equipo pequeño, <span className="font-semibold text-[#393832]">ideas sin límite.</span></span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.96, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }} className="relative mx-auto w-full max-w-[470px]">
                <div className="absolute -left-3 top-12 z-10 rounded-full bg-[#fbfaf7] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#55524b] shadow-lg shadow-black/5 sm:-left-10">
                  <Sparkles className="mr-1.5 inline text-[#ef6548]" size={13} /> Diseñamos con intención
                </div>
                <div className="relative aspect-[0.93] overflow-hidden rounded-[48%_48%_18px_18px] bg-[#e8b99f]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_28%,#f4d9c0_0%,transparent_42%),linear-gradient(145deg,#d7a88c_0%,#e9c0a4_48%,#bf735f_100%)]" />
                  <div className="absolute left-[17%] top-[16%] size-[68%] rounded-full border border-white/45" />
                  <div className="absolute left-[25%] top-[24%] size-[52%] rounded-full border border-white/35" />
                  <div className="absolute left-[32%] top-[30%] size-[38%] rounded-full bg-[#f5e9d9]/65 shadow-[inset_-18px_-14px_35px_#c68c77]" />
                  <div className="absolute bottom-0 left-0 right-0 flex h-28 items-end justify-between bg-gradient-to-t from-[#28251f]/70 to-transparent p-6 text-white sm:p-8">
                    <div><p className="text-[10px] uppercase tracking-[0.2em] text-white/65">Identidad destacada</p><p className="mt-1 font-serif text-2xl">Casa Nómada</p></div>
                    <span className="grid size-10 place-items-center rounded-full border border-white/40"><ArrowUpRight size={17} /></span>
                  </div>
                  <span className="absolute right-7 top-8 grid size-12 place-items-center rounded-full bg-[#f2e6d5] text-[#ef6548] shadow-lg"><Asterisk size={27} /></span>
                </div>
                <div className="absolute -bottom-5 -right-2 flex items-center gap-2 rounded-full border border-[#e1dbd0] bg-[#fbfaf7] px-4 py-2.5 text-xs text-[#55524b] shadow-lg shadow-black/5 sm:-right-7">
                  <span className="size-2 rounded-full bg-[#7a9b68]" /> Disponibles para nuevos proyectos
                </div>
              </motion.div>
            </div>
            <a href="#proyectos" aria-label="Desplazarse a proyectos" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-[#8c887e] transition hover:text-[#ef6548] lg:block">
              <ArrowDown size={18} />
            </a>
          </section>

          <section className="border-y border-[#e9e6df] bg-[#fbfaf7]">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-6 py-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8e8a80] sm:px-10 lg:justify-between lg:px-14">
              <span>Ideas que se sienten</span><Asterisk size={17} className="hidden text-[#ef6548] lg:block" />
              <span>Diseño con propósito</span><Asterisk size={17} className="hidden text-[#ef6548] lg:block" />
              <span>Hecho para conectar</span><Asterisk size={17} className="hidden text-[#ef6548] lg:block" />
              <span>Un poco fuera de lo común</span>
            </div>
          </section>

          <section id="proyectos" className="scroll-mt-8 bg-[#fbfaf7] px-6 py-24 sm:px-10 sm:py-32 lg:px-14">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <div>
                  <SectionEyebrow>Una selección de lo que hacemos</SectionEyebrow>
                  <h2 className="mt-5 text-5xl font-medium tracking-[-0.075em] text-[#24231f] sm:text-6xl">Trabajo con <span className="font-serif font-normal italic text-[#ef6548]">intención.</span></h2>
                </div>
                <p className="max-w-sm text-sm leading-6 text-[#77746c]">Cada proyecto empieza escuchando y termina contando una historia que merece ser compartida.</p>
              </div>

              <div className="mt-10 flex flex-wrap gap-2" aria-label="Filtrar proyectos">
                {filters.map((filter) => (
                  <button key={filter} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter} className={`rounded-full px-4 py-2 text-xs font-medium transition ${activeFilter === filter ? 'bg-[#24231f] text-white' : 'border border-[#e6e2da] text-[#77746c] hover:border-[#b8b2a6] hover:text-[#24231f]'}`}>
                    {filter}
                  </button>
                ))}
              </div>

              <motion.div layout className="mt-7 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visibleProjects.map((project, index) => (
                    <motion.article key={project.name} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3, delay: index * 0.04 }} className="group">
                      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.background} transition duration-500 group-hover:shadow-xl group-hover:shadow-black/10`}>
                        <ProjectArtwork project={project} />
                        <span className="absolute right-4 top-4 grid size-9 translate-y-2 place-items-center rounded-full bg-white/90 text-[#24231f] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={16} /></span>
                      </div>
                      <div className="mt-5 flex items-start justify-between gap-4">
                        <div><p className="text-xl font-medium tracking-[-0.04em] text-[#282722]">{project.name}</p><p className="mt-1.5 text-sm text-[#858177]">{project.description}</p></div>
                        <span className="mt-1 shrink-0 text-[10px] uppercase tracking-[0.12em] text-[#979389]">{project.year}</span>
                      </div>
                      <span className="mt-3 inline-block rounded-full bg-[#f0eee8] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#716d63]">{project.category}</span>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          <section id="servicios" className="scroll-mt-8 bg-[#24231f] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-14">
            <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <SectionEyebrow light>Cómo podemos ayudarte</SectionEyebrow>
                <h2 className="mt-5 max-w-lg text-5xl font-medium leading-[0.98] tracking-[-0.075em] sm:text-6xl">Hacemos espacio para <span className="font-serif font-normal italic text-[#f1876b]">lo nuevo.</span></h2>
                <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">Pensamos, diseñamos y construimos en equipo. Sin fórmulas hechas. Sin perder de vista lo que te hace diferente.</p>
                <button onClick={() => setContactOpen(true)} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm transition hover:border-[#ef6548] hover:bg-[#ef6548]">
                  Así podríamos trabajar <ArrowUpRight size={15} />
                </button>
              </div>
              <div className="border-t border-white/15">
                {services.map(({ icon: Icon, title, detail }, index) => (
                  <motion.div key={title} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.1 }} className="group flex items-center gap-5 border-b border-white/15 py-6 sm:py-8">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/15 text-[#f1876b] transition group-hover:border-[#f1876b]"><Icon size={20} /></span>
                    <div className="flex-1"><h3 className="text-lg font-medium tracking-[-0.03em] sm:text-xl">{title}</h3><p className="mt-1 text-sm text-white/45">{detail}</p></div>
                    <span className="text-xs text-white/35">0{index + 1}</span>
                    <ArrowDownRight className="text-white/30 transition group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-[#f1876b]" size={19} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="estudio" className="scroll-mt-8 bg-[#f1eee7] px-6 py-24 sm:px-10 sm:py-32 lg:px-14">
            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-24">
              <motion.div initial={{ opacity: 0, rotate: -2 }} whileInView={{ opacity: 1, rotate: 0 }} viewport={{ once: true }} className="relative mx-auto w-full max-w-md">
                <div className="aspect-[1.15] overflow-hidden rounded-[45%_45%_18px_18px] bg-[#d8c9b5]">
                  <div className="relative h-full bg-[radial-gradient(ellipse_at_60%_38%,#eee2cc_0%,transparent_45%),linear-gradient(130deg,#c2b09c,#e0d1bd_55%,#b7a28d)]">
                    <div className="absolute left-[14%] top-[18%] h-[68%] w-[40%] rounded-t-[45%] bg-[#6f7964]/75" />
                    <div className="absolute right-[12%] top-[25%] h-[62%] w-[43%] rounded-t-[48%] bg-[#a76e5a]/70" />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#6b5c4e]/55 to-transparent" />
                    <div className="absolute bottom-5 left-5 rounded-full bg-[#fbfaf7] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#68645b]">Gente real, ideas honestas</div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-2 flex size-24 flex-col items-center justify-center rounded-full bg-[#ef6548] text-white shadow-lg sm:-right-6">
                  <Asterisk size={27} /><span className="text-[9px] uppercase tracking-[0.13em]">Desde 2019</span>
                </div>
              </motion.div>
              <div>
                <SectionEyebrow>Un estudio, muchas perspectivas</SectionEyebrow>
                <h2 className="mt-5 text-5xl font-medium leading-[0.98] tracking-[-0.075em] text-[#24231f] sm:text-6xl">Somos pequeños por elección. <span className="font-serif font-normal italic text-[#ef6548]">Grandes en ideas.</span></h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-[#77746c]">Creemos que el buen diseño no tiene que gritar para hacerse notar. Unimos estrategia y sensibilidad para construir marcas cercanas, útiles y memorables.</p>
                <div className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-[#dcd7cc] pt-6">
                  <div><p className="text-3xl font-medium tracking-[-0.07em] text-[#24231f]">24<span className="text-[#ef6548]">+</span></p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#878379]">Marcas creadas</p></div>
                  <div><p className="text-3xl font-medium tracking-[-0.07em] text-[#24231f]">8</p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#878379]">Países alcanzados</p></div>
                  <div><p className="text-3xl font-medium tracking-[-0.07em] text-[#24231f]">6<span className="text-[#ef6548]">a</span></p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#878379]">Mano en el equipo</p></div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#fbfaf7] px-6 py-24 sm:px-10 sm:py-32 lg:px-14">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#ef6548] px-7 py-14 text-white sm:px-14 sm:py-20 lg:px-20">
              <div className="absolute -right-12 -top-24 size-72 rounded-full border border-white/20 sm:right-12 sm:size-96" />
              <div className="absolute -right-2 -top-14 size-52 rounded-full border border-white/20 sm:right-24 sm:size-72" />
              <div className="relative max-w-2xl">
                <SectionEyebrow light>Todo empieza con una conversación</SectionEyebrow>
                <h2 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.075em] sm:text-7xl">La próxima buena idea puede ser <span className="font-serif font-normal italic">la tuya.</span></h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-white/75">Estamos aquí para escucharla, darle forma y hacerla realidad.</p>
                <button onClick={() => setContactOpen(true)} className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#fbfaf7] px-6 py-3.5 text-sm font-semibold text-[#24231f] transition hover:bg-[#24231f] hover:text-white">
                  Empecemos a hablar <ArrowUpRight size={17} />
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-[#24231f] px-6 py-8 text-white sm:px-10 lg:px-14">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Brand light />
            <p className="text-xs text-white/45">Un estudio independiente para ideas que importan.</p>
            <div className="flex items-center gap-4">
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button onClick={copyEmail} aria-label="Copiar correo electrónico" className="grid size-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-[#f1876b] hover:text-[#f1876b]">
                    <Check size={15} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal><Tooltip.Content side="top" sideOffset={8} className="z-40 rounded-lg bg-[#fbfaf7] px-3 py-2 text-xs font-medium text-[#24231f] shadow-lg">Copiar hola@surestudio.co<Tooltip.Arrow className="fill-[#fbfaf7]" /></Tooltip.Content></Tooltip.Portal>
              </Tooltip.Root>
              <button onClick={() => setContactOpen(true)} className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white">
                Hablemos <ArrowRight size={15} />
              </button>
              <span className="text-xs text-white/35">© 2025 Sur Estudio</span>
            </div>
          </div>
        </footer>
      </div>
    </Tooltip.Provider>
  )
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f8f7f4] px-6 text-center">
      <div><Brand /><p className="mt-10 text-sm uppercase tracking-[0.18em] text-[#ef6548]">404 · Esta página no existe</p><h1 className="mt-3 text-5xl font-medium tracking-[-0.07em] text-[#24231f]">Nos fuimos por otro camino.</h1><Link to="/" className="mt-7 inline-flex items-center gap-2 text-sm text-[#ef6548]">Volver al inicio <ArrowRight size={15} /></Link></div>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StudioHome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
