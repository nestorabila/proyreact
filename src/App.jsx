import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, ArrowUpRight, BookOpen, ChevronDown, ChevronUp, LoaderCircle, Search, X } from 'lucide-react'

const SPREADSHEET_ID = '1UuL9khCaSuTgWa3jEuwT-Diah1OUquuLMi_9iwoQ4MY'
const PROGRAMS_SHEET = '2da LISTA DISPONIBLES'
const MODULES_SHEET = 'MALLAS'

const columns = [
  { key: 'codigo', label: 'COD-ACADEM' },
  { key: 'resolucion', label: 'RESOLUCION' },
  { key: 'area', label: 'AREA' },
  { key: 'tipo', label: 'TIPO' },
  { key: 'programa', label: 'PROGRAMA' },
  { key: 'version', label: 'VERSION' },
  { key: 'sede', label: 'SEDE UNSXX' },
  { key: 'modalidad', label: 'MODALIDAD' },
  { key: 'modulos', label: 'N MODULOS' },
  { key: 'disponibilidad', label: 'DISPONIBILIDAD' },
]

const programFields = [
  ...columns.map((column) => ({ ...column, header: column.label })),
  { key: 'pyLeerDatos', header: 'LINK PDF' },
]

const moduleFields = [
  { key: 'codigo', header: 'COD-ACADEM' },
  { key: 'numero', header: 'NRO. MÓDULO' },
  { key: 'nombre', header: 'NOMBRE DE MÓDULO' },
  { key: 'contenido', header: 'CONTENIDO MÍNIMO' },
]

/* Lector anterior de Apps Script, conservado pero desactivado.
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby-e6rvhTC9iTCeAyPWxYJ6oPsruNWhif9zvhqjVm8L8O7yQnV6eVTssztQdU1RYTZt7Q/exec'

function loadSheetRows(url, parameters, onSuccess, onError) {
  const callbackName = `__availableRows_${Date.now()}_${Math.random().toString(36).slice(2)}`
  const script = document.createElement('script')
  const separator = url.includes('?') ? '&' : '?'
  const query = new URLSearchParams({ ...parameters, callback: callbackName })
  const requestUrl = `${url}${separator}${query.toString()}`
  let timeoutId
  let callbackReceived = false
  let scriptLoaded = false
  let settled = false

  console.info('[hoja] Iniciando conexión con Apps Script.', {
    endpoint: url,
    callback: callbackName,
  })

  window[callbackName] = (result) => {
    callbackReceived = true
    settled = true
    window.clearTimeout(timeoutId)
    console.info('[hoja] Apps Script ejecutó el callback.', {
      hasError: Boolean(result?.error),
      rowCount: Array.isArray(result?.data) ? result.data.length : undefined,
      moduleCount: Array.isArray(result?.modules) ? result.modules.length : undefined,
      responseKeys: result && typeof result === 'object' ? Object.keys(result) : [],
    })
    if (result?.error) {
      console.error('[hoja] El Apps Script devolvió un error:', result.error)
      onError(result.error)
    } else if (result && typeof result === 'object') {
      onSuccess(result)
    } else {
      console.error('[hoja] La respuesta no tiene el formato esperado.', result)
      onError('La respuesta del Apps Script no tiene el formato esperado.')
    }
  }

  script.async = true
  script.src = requestUrl
  script.onload = () => {
    scriptLoaded = true
    console.info('[hoja] El navegador cargó la respuesta del Apps Script.', {
      callbackReceived,
      requestUrl,
    })
  }
  script.onerror = (event) => {
    settled = true
    window.clearTimeout(timeoutId)
    console.error('[hoja] El navegador no pudo cargar el Apps Script.', {
      event,
      requestUrl,
    })
    onError('No se pudo conectar con la hoja. Revisa la URL y la implementación del Apps Script.')
  }

  timeoutId = window.setTimeout(() => {
    if (settled) return
    settled = true
    console.error('[hoja] Tiempo agotado esperando respuesta JSONP.', {
      callbackReceived,
      scriptLoaded,
      requestUrl,
      hint: 'Puede ser una autorización, despliegue o respuesta que no llamó al callback.',
    })
    onError('La hoja tardó demasiado en responder. Intenta actualizar la página.')
  }, 15000)
  document.head.appendChild(script)

  return () => {
    window.clearTimeout(timeoutId)
    delete window[callbackName]
    script.remove()
    console.info('[hoja] Se limpió la petición del Apps Script.')
  }
}
*/

function loadPublicSheet(sheetName) {
  const callbackName = `__publicSheet_${Date.now()}_${Math.random().toString(36).slice(2)}`
  const script = document.createElement('script')
  const params = new URLSearchParams({
    sheet: sheetName,
    headers: '1',
    tqx: `out:json;responseHandler:${callbackName}`,
  })
  const requestUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?${params.toString()}`
  let timeoutId

  const cleanup = () => {
    window.clearTimeout(timeoutId)
    delete window[callbackName]
    script.remove()
  }

  const promise = new Promise((resolve, reject) => {
    window[callbackName] = (response) => {
      cleanup()
      if (response?.status !== 'ok' || !response.table) {
        const message = response?.errors?.[0]?.detailed_message
          || response?.errors?.[0]?.message
          || 'Google Sheets no devolvió datos para esta hoja.'
        reject(new Error(message))
        return
      }

      const headers = response.table.cols.map((column) => column.label || column.id || '')
      const rows = (response.table.rows || []).map((row) =>
        headers.map((_, index) => {
          const cell = row.c?.[index]
          return cell?.v ?? cell?.f ?? ''
        }),
      )

      resolve({ headers, rows })
    }

    script.async = true
    script.src = requestUrl
    script.onerror = () => {
      cleanup()
      reject(new Error(`No se pudo leer la hoja pública “${sheetName}”.`))
    }

    timeoutId = window.setTimeout(() => {
      cleanup()
      reject(new Error(`La hoja “${sheetName}” tardó demasiado en responder.`))
    }, 20000)
    document.head.appendChild(script)
  })

  return { promise, cancel: cleanup }
}

function normalizeSheetHeader(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '')
}

function recordsFromSheet(headers, rows, fields) {
  const normalizedHeaders = headers.map(normalizeSheetHeader)
  const indexes = fields.map((field) => ({
    ...field,
    index: normalizedHeaders.indexOf(normalizeSheetHeader(field.header)),
  }))
  const missing = indexes.filter((field) => field.index < 0).map((field) => field.header)

  if (missing.length) {
    throw new Error(`Faltan columnas en Google Sheets: ${missing.join(', ')}`)
  }

  return rows.map((row) => {
    const record = {}
    indexes.forEach((field) => {
      record[field.key] = row[field.index] ?? ''
    })
    return record
  })
}

function getSafeProjectUrl(value) {
  try {
    const url = new URL(String(value || '').trim())
    return url.protocol === 'https:' ? url.href : ''
  } catch {
    return ''
  }
}

function getProjectPreviewUrl(value) {
  const safeUrl = getSafeProjectUrl(value)
  if (!safeUrl) return ''

  const url = new URL(safeUrl)
  const editorMatch = url.pathname.match(/^\/(document|spreadsheets|presentation)\/(?:u\/\d+\/)?d\/([^/]+)/)
  if (editorMatch) {
    return `${url.origin}/${editorMatch[1]}/d/${editorMatch[2]}/preview`
  }

  const driveFileMatch = url.pathname.match(/\/file\/d\/([^/]+)/)
  const driveFileId = driveFileMatch?.[1] || url.searchParams.get('id')
  if (url.hostname === 'drive.google.com' && driveFileId) {
    return `https://drive.google.com/file/d/${driveFileId}/preview`
  }

  return safeUrl
}

export default function App() {
  const [rows, setRows] = useState([])
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('todos')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedRows, setExpandedRows] = useState(() => new Set())
  const [visibleCount, setVisibleCount] = useState(20)
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [selectedModules, setSelectedModules] = useState([])
  const [modulesLoading, setModulesLoading] = useState(false)
  const [modulesError, setModulesError] = useState('')
  const [projectPreview, setProjectPreview] = useState(null)

  useEffect(() => {
    setVisibleCount(20)
  }, [search, typeFilter])

  useEffect(() => {
    if (!selectedProgram) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProgram(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedProgram])

  useEffect(() => {
    if (!projectPreview) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setProjectPreview(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [projectPreview])

  useEffect(() => {
    setLoading(true)
    setError('')
    let active = true
    const request = loadPublicSheet(PROGRAMS_SHEET)

    request.promise
      .then(({ headers, rows: sheetRows }) => {
        const data = recordsFromSheet(headers, sheetRows, programFields)
        if (!active) return
        setRows(data)
        setLoading(false)
      })
      .catch((loadError) => {
        if (!active) return
        console.error('[hoja pública] Error leyendo programas:', loadError)
        setError(loadError.message || 'No se pudieron leer los programas.')
        setLoading(false)
      })

    return () => {
      active = false
      request.cancel()
    }
  }, [])

  useEffect(() => {
    if (!selectedProgram) {
      setSelectedModules([])
      setModulesError('')
      return undefined
    }

    setSelectedModules([])
    setModulesError('')
    setModulesLoading(true)

    let active = true
    const request = loadPublicSheet(MODULES_SHEET)

    request.promise
      .then(({ headers, rows: sheetRows }) => {
        const code = normalizeSheetHeader(selectedProgram.codigo)
        const modules = recordsFromSheet(headers, sheetRows, moduleFields)
          .filter((module) => normalizeSheetHeader(module.codigo) === code)
          .map((module) => ({
            ...module,
            nombre: String(module.nombre || '').toLocaleUpperCase('es'),
            contenido: String(module.contenido || '')
              .split(/\r?\n/)
              .map((line) => line.replace(/^["“]|["”]$/g, '').trim())
              .filter(Boolean)
              .map((line) => line.charAt(0).toLocaleUpperCase('es') + line.slice(1)),
          }))
          .sort((first, second) => Number(first.numero) - Number(second.numero))

        if (!active) return
        setSelectedModules(modules)
        setModulesLoading(false)
      })
      .catch((loadError) => {
        if (!active) return
        console.error('[hoja pública] Error leyendo módulos:', loadError)
        setModulesError(loadError.message || 'No se pudieron leer los módulos.')
        setModulesLoading(false)
      })

    return () => {
      active = false
      request.cancel()
    }
  }, [selectedProgram])

  const visibleRows = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    const normalize = (value) => String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase()

    return rows.filter((row) => {
      const matchesType = typeFilter === 'todos' || normalize(row.tipo).includes(typeFilter)
      const matchesSearch = !query || columns
        .map(({ key }) => row[key] || '')
        .join(' ')
        .toLocaleLowerCase()
        .includes(query)
      return matchesType && matchesSearch
    })
  }, [rows, search, typeFilter])

  const displayedRows = visibleRows.slice(0, visibleCount)
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f4f6fa] text-[#1c2d47]">
      <header className="shrink-0 border-b border-[#e0e5ed] bg-white">
        <div className="mx-auto flex w-full flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <a href="#inicio" className="flex min-w-0 items-center gap-3" aria-label="Inicio">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#1c355c] text-white">
                <BookOpen size={21} strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#667895]">Consulta académica</span>
                <span className="mt-0.5 block truncate font-serif text-xl leading-none text-[#1c2d47]">Registros disponibles</span>
              </span>
            </a>
            {!loading && !error && (
              <span className="shrink-0 rounded-full bg-[#edf2f8] px-2.5 py-1 text-xs font-semibold text-[#27466f]">
                {visibleRows.length} {visibleRows.length === 1 ? 'registro' : 'registros'}
              </span>
            )}
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <label className="sr-only" htmlFor="type-filter">Filtrar por tipo</label>
            <select
              id="type-filter"
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="h-11 w-full rounded-xl border border-[#dce3ee] bg-[#fafbfe] px-3 text-sm text-[#56657d] outline-none focus:border-[#8494ad] sm:w-48"
            >
              <option value="todos">Diplomado y maestría</option>
              <option value="diplomado">Diplomado</option>
              <option value="maestria">Maestría</option>
            </select>
            <label className="flex h-11 w-full items-center gap-3 rounded-xl border border-[#dce3ee] bg-[#fafbfe] px-4 sm:max-w-sm">
              <Search size={17} className="shrink-0 text-[#78869b]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#9aa5b5]"
                placeholder="Buscar en la oferta académica"
                aria-label="Buscar en la oferta académica"
              />
            </label>
          </div>
        </div>
      </header>

      <main id="inicio" className="mx-auto flex min-h-0 w-full flex-1 flex-col px-4 py-3 sm:px-6 lg:px-8">
        <section className="mt-1 flex min-h-0 flex-1 flex-col" aria-label="Oferta académica disponible">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-gutter:stable]">
          {loading ? (
            <div className="flex min-h-56 items-center justify-center gap-3 text-sm text-[#738197]">
              <LoaderCircle size={19} className="animate-spin text-[#27466f]" />
              Cargando registros…
            </div>
          ) : error ? (
            <div className="flex min-h-56 flex-col items-center justify-center px-6 text-center">
              <span className="grid size-11 place-items-center rounded-full bg-[#fff4e7] text-[#9b682e]">
                <AlertCircle size={20} />
              </span>
              <p className="mt-3 max-w-lg text-sm leading-6 text-[#637188]">{error}</p>
            </div>
          ) : visibleRows.length === 0 ? (
            <div className="flex min-h-56 items-center justify-center px-6 text-center text-sm text-[#738197]">
              {rows.length ? 'No hay registros que coincidan con la búsqueda.' : 'La hoja no tiene registros disponibles.'}
            </div>
          ) : (
            <div className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3">
              {displayedRows.map((row, index) => {
                const availabilityText = String(row.disponibilidad || '').toLocaleUpperCase()
                const available = availabilityText.includes('DISPONIBLE') && !availabilityText.includes('NO DISPONIBLE')
                const detailColumns = columns.filter(
                  (column) => !['codigo', 'programa', 'tipo'].includes(column.key),
                )
                const rowKey = `${row.codigo}-${row.resolucion}-${index}`
                const isExpanded = expandedRows.has(rowKey)
                const projectUrl = getSafeProjectUrl(row.pyLeerDatos)

                return (
                  <article
                    key={rowKey}
                    className="relative min-w-0 rounded-xl border border-t-2 border-[#e2e7f0] border-t-[#849ac0] bg-white p-4 shadow-[0_3px_14px_rgba(28,53,92,0.045)] transition duration-200 hover:-translate-y-0.5 hover:border-[#cbd5e5] hover:shadow-[0_12px_28px_rgba(28,53,92,0.10)] sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="max-w-[55%] truncate pr-2 font-mono text-sm font-bold tracking-wide text-[#27466f]">
                        {row.codigo || 'Sin código'}
                      </span>
                      {row.tipo && (
                        <span className="absolute right-0 top-0 inline-flex max-w-[48%] items-center gap-2 truncate rounded-bl-xl rounded-tr-xl border-b border-l border-[#d8e1ee] bg-[#eef3fa] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#2e4f7d]">
                          <span className={`size-2 shrink-0 rounded-full ${available ? 'bg-[#355b91] shadow-[0_0_0_3px_rgba(53,91,145,0.14)]' : 'bg-[#98a3b4]'}`} />
                          {row.tipo}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 min-h-6 text-lg font-semibold leading-snug text-[#1f304c]">
                      {row.programa || 'Programa sin nombre'}
                    </h3>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-[#e8ecf2] pt-3">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => setExpandedRows((current) => {
                          const next = new Set(current)
                          if (next.has(rowKey)) next.delete(rowKey)
                          else next.add(rowKey)
                          return next
                        })}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2e4f7d] transition hover:text-[#1c2d47]"
                      >
                        {isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </button>
                      <div className="flex items-center gap-2">
                        {/* <button
                          type="button"
                          onClick={() => setSelectedProgram(row)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#dce3ee] px-2.5 py-1.5 text-xs font-semibold text-[#4d5f7e] transition hover:bg-[#f3f6fb]"
                        >
                          <BookOpen size={14} /> Ver módulos
                        </button> */}
                        {projectUrl ? (
                          <button
                            type="button"
                            onClick={() => setProjectPreview({
                              url: projectUrl,
                              previewUrl: getProjectPreviewUrl(projectUrl),
                              title: row.programa || row.codigo || 'Proyecto académico',
                            })}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#1c355c] px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#132542]"
                          >
                            Ver proyecto <ArrowUpRight size={14} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled
                            title="Este registro todavía no tiene un enlace de proyecto."
                            className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full bg-[#e9edf3] px-2.5 py-1.5 text-xs font-semibold text-[#8692a6]"
                          >
                            Ver proyecto <ArrowUpRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[#e8ecf2] pt-3 sm:grid-cols-3">
                        {detailColumns.map((column) => (
                          <div key={column.key} className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-[#8692a6]">
                              {column.label}
                            </p>
                            <p className="mt-1 break-words text-sm leading-5 text-[#56657d]">
                              {row[column.key] || '—'}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          )}

          {!loading && !error && visibleRows.length > 0 && (
            <div className="flex flex-col items-center gap-2 border-t border-[#e8ecf2] px-4 py-5">
              <p className="text-xs text-[#8692a6]">
                Mostrando {displayedRows.length} de {visibleRows.length} registros
              </p>
              {displayedRows.length < visibleRows.length && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 20)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#dbe3ef] bg-white px-5 py-2.5 text-sm font-semibold text-[#27466f] shadow-sm transition hover:border-[#9facbf] hover:bg-[#f7f9fd]"
                >
                  Mostrar más <ChevronDown size={16} />
                </button>
              )}
            </div>
          )}
          </div>
        </section>

        <p className="mt-2 shrink-0 text-xs leading-5 text-[#8994a5]">
          La información mostrada proviene de la hoja de cálculo y se presenta en modo de consulta.
        </p>
      </main>

      {selectedProgram && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#151f32]/55 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProgram(null)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="modules-dialog-title"
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-[#e0e5ed] bg-[#fafbfe] shadow-2xl sm:rounded-3xl"
          >
            <header className="flex items-start justify-between gap-5 border-b border-[#e4e8ef] bg-white px-5 py-5 sm:px-7">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#77849a]">Malla curricular</p>
                <h2 id="modules-dialog-title" className="mt-2 font-serif text-2xl leading-tight text-[#1c2d47] sm:text-3xl">
                  {selectedProgram.programa || 'Programa académico'}
                </h2>
                <p className="mt-2 font-mono text-xs font-semibold text-[#5c6f8d]">{selectedProgram.codigo}</p>
              </div>
              <button
                type="button"
                autoFocus
                onClick={() => setSelectedProgram(null)}
                aria-label="Cerrar módulos"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-[#e0e5ed] bg-white text-[#626f84] transition hover:bg-[#f1f4f8]"
              >
                <X size={18} />
              </button>
            </header>

            <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              {modulesLoading ? (
                <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-[#738197]">
                  <LoaderCircle size={19} className="animate-spin text-[#27466f]" />
                  Cargando módulos…
                </div>
              ) : modulesError ? (
                <div className="rounded-2xl border border-[#eadfce] bg-[#fffaf3] px-5 py-8 text-center text-sm text-[#8b6939]">
                  {modulesError}
                </div>
              ) : selectedModules.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#d9e0eb] bg-white px-5 py-12 text-center text-sm text-[#738197]">
                  No se encontraron módulos para este código académico.
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedModules.map((module, index) => (
                    <article key={`${module.numero}-${module.nombre}-${index}`} className="rounded-2xl border border-[#e0e5ed] bg-white p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#edf2f8] font-mono text-sm font-bold text-[#2e4f7d]">
                          {module.numero || index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8692a6]">
                            Módulo {module.numero || index + 1}
                          </p>
                          <h3 className="mt-1 text-sm font-bold uppercase leading-6 tracking-[0.025em] text-[#1f304c] sm:text-base">
                            {String(module.nombre || '').toLocaleUpperCase('es')}
                          </h3>
                          {Array.isArray(module.contenido) && module.contenido.length > 0 && (
                            <ul className="mt-3 space-y-2 border-t border-[#edf0f5] pt-3">
                              {module.contenido.map((line, lineIndex) => {
                                const text = String(line || '').trim()
                                const formatted = text
                                  ? text.charAt(0).toLocaleUpperCase('es') + text.slice(1)
                                  : ''
                                return formatted ? (
                                  <li key={`${lineIndex}-${formatted}`} className="flex gap-2.5 text-sm leading-6 text-[#56657d]">
                                    <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-[#7d94b8]" />
                                    <span>{formatted}</span>
                                  </li>
                                ) : null
                              })}
                            </ul>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {projectPreview && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-[#151f32]/60 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setProjectPreview(null)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-preview-title"
            className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-[#e0e5ed] bg-[#f5f6f9] shadow-2xl sm:rounded-3xl"
          >
            <header className="flex items-center justify-between gap-4 border-b border-[#e4e8ef] bg-white px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#77849a]">Vista previa del proyecto</p>
                <h2 id="project-preview-title" className="mt-1 truncate text-base font-semibold text-[#1c2d47] sm:text-lg">
                  {projectPreview.title}
                </h2>
              </div>
              <button
                type="button"
                autoFocus
                onClick={() => setProjectPreview(null)}
                aria-label="Cerrar vista previa"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-[#e0e5ed] bg-white text-[#626f84] transition hover:bg-[#f1f4f8]"
              >
                <X size={18} />
              </button>
            </header>

            <div className="min-h-0 flex-1 p-3 sm:p-5">
              <iframe
                src={projectPreview.previewUrl}
                title={`Vista previa de ${projectPreview.title}`}
                className="h-[60vh] min-h-[280px] w-full rounded-xl border border-[#e0e5ed] bg-white sm:rounded-2xl"
                allowFullScreen
              />
            </div>

            <footer className="flex flex-col items-center justify-between gap-3 border-t border-[#e4e8ef] bg-white px-5 py-4 sm:flex-row sm:px-6">
              <p className="text-center text-xs text-[#8692a6] sm:text-left">
                Si no aparece la vista previa, abre el proyecto directamente.
              </p>
              <a
                href={projectPreview.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1c355c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#132542]"
              >
                Entrar al proyecto <ArrowUpRight size={16} />
              </a>
            </footer>
          </section>
        </div>
      )}

      <footer className="shrink-0 border-t border-[#e0e5ed] bg-white px-4 py-4 text-center text-xs text-[#8994a5] sm:px-6 lg:px-8">
        Consulta académica · Información de registros disponibles
      </footer>
    </div>
  )
}
