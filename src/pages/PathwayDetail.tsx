import { Link, useParams } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { canonicalPathways } from '../data/canonicalPathways'
import { pathwaySequences } from '../data/pathwaySequences'
import './PathwayDetail.css'

const groupIds = ['seer', 'apprentice', 'marauder']

function tier(number: number, en: boolean): string {
  if (number === 0) return en ? 'True God' : '真神'
  if (number <= 2) return en ? 'Angel' : '天使'
  if (number <= 4) return en ? 'Saint' : '圣者'
  if (number <= 7) return en ? 'Mid Sequence' : '中序列'
  return en ? 'Low Sequence' : '低序列'
}

export default function PathwayDetail() {
  const { pathwayId } = useParams<{ pathwayId: string }>()
  const { language } = useLanguage()
  const en = language === 'en'
  const pathway = canonicalPathways.find(item => item.id === pathwayId)
  const record = pathwayId ? pathwaySequences[pathwayId] : undefined

  if (!pathway) {
    return (
      <section className="pathway-detail-container">
        <h1>{en ? 'Unknown pathway' : '未找到此途径'}</h1>
        <Link to="/directory">{en ? 'Back to directory' : '返回途径图鉴'}</Link>
      </section>
    )
  }

  const related = groupIds.includes(pathway.id)
    ? canonicalPathways.filter(item => groupIds.includes(item.id) && item.id !== pathway.id)
    : []

  return (
    <section className="pathway-detail-container">
      <Link to="/directory" className="back-link">← {en ? 'All 22 Pathways' : '返回二十二条途径'}</Link>
      <header className="pathway-detail-heading">
        <span aria-hidden="true" className="pathway-detail-symbol">{pathway.symbol}</span>
        <div>
          <p className="pathway-detail-eyebrow">{en ? 'Sequence 9' : '序列 9'} · {en ? pathway.sequence9En : pathway.sequence9}</p>
          <h1>{en ? pathway.sequence0En : pathway.sequence0}{en ? ' Pathway' : '途径'}</h1>
          <p>{en ? 'Sequence 0' : '序列 0'} · {en ? pathway.sequence0En : pathway.sequence0}</p>
        </div>
      </header>

      <div className="pathway-detail-notice" role="status">
        {record
          ? en
            ? 'The ten Chinese sequence names have been reviewed. Abilities, rituals and English translations require further verification.'
            : '已核对十个序列的名称。能力、仪式和扮演守则将逐项查证原著后补充。'
          : en
            ? 'Only the Sequence 9 and 0 identities are currently listed. Intermediate names are awaiting verification.'
            : '目前仅展示已整理的序列 9 与序列 0 名称，其余序列正在逐项核验。'}
      </div>

      <h2 className="pathway-detail-section-title">{en ? 'Sequence progression' : '序列晋升路线'}</h2>
      {record ? (
        <ol className="sequence-tree">
          {record.sequences.map(sequence => (
            <li className="sequence-node" key={sequence.number}>
              <span className="sequence-number">{sequence.number.toString().padStart(2, '0')}</span>
              <div>
                <strong>{sequence.name}</strong>
                <small>{tier(sequence.number, en)}</small>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="sequence-pending">
          <div>{en ? 'Sequence 9' : '序列 9'} — {en ? pathway.sequence9En : pathway.sequence9}</div>
          <p>{en ? 'Sequences 8–1: under review' : '序列 8–1：待核验'}</p>
          <div>{en ? 'Sequence 0' : '序列 0'} — {en ? pathway.sequence0En : pathway.sequence0}</div>
        </div>
      )}

      {related.length > 0 && (
        <section className="related-pathways">
          <h2 className="pathway-detail-section-title">{en ? 'Neighboring pathways' : '相邻途径'}</h2>
          <p>{en ? 'These three pathways are associated with the Lord of Mysteries group.' : '这三条途径同属诡秘之主相关途径组。高序列互换条件仍需单独核验。'}</p>
          <div className="related-pathways-links">
            {related.map(item => (
              <Link key={item.id} to={`/directory/${item.id}`}>
                <span aria-hidden="true">{item.symbol}</span> {en ? item.sequence0En : item.sequence0}
              </Link>
            ))}
          </div>
        </section>
      )}

      {record && (
        <p className="pathway-detail-source">
          {en ? 'Source for sequence names: ' : '序列名称参考：'}
          <a href={record.source.url} target="_blank" rel="noopener noreferrer">{record.source.title} ↗</a>
        </p>
      )}
    </section>
  )
}
