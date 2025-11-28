import { useState } from 'react'
import { BookOpen, Search } from 'lucide-react'

interface GlossaryTerm {
  term: string
  definition: string
  category: string
}

const glossaryTerms: GlossaryTerm[] = [
  // Diabetes
  { term: 'A1c (Hemoglobin A1c)', definition: 'A blood test that reflects average blood glucose over the past 2-3 months. Target is typically <7% for most patients.', category: 'Diabetes' },
  { term: 'Hypoglycemia', definition: 'Low blood glucose, typically <70 mg/dL. Symptoms include sweating, tremors, confusion, and can progress to seizures or loss of consciousness.', category: 'Diabetes' },
  { term: 'Hyperglycemia', definition: 'Elevated blood glucose. Chronic hyperglycemia leads to microvascular and macrovascular complications.', category: 'Diabetes' },
  { term: 'Glycemic Control', definition: 'The management of blood glucose levels to prevent complications while minimizing hypoglycemia risk.', category: 'Diabetes' },
  { term: 'Microvascular Complications', definition: 'Diabetes complications affecting small blood vessels: retinopathy, nephropathy, and neuropathy.', category: 'Diabetes' },
  { term: 'Macrovascular Complications', definition: 'Diabetes complications affecting large blood vessels: coronary artery disease, stroke, and peripheral arterial disease.', category: 'Diabetes' },

  // Hypertension
  { term: 'Hypertension', definition: 'Persistently elevated blood pressure, defined as systolic ≥130 or diastolic ≥80 mmHg.', category: 'Hypertension' },
  { term: 'White Coat Hypertension', definition: 'Elevated office BP but normal home BP readings. May not require immediate treatment.', category: 'Hypertension' },
  { term: 'Masked Hypertension', definition: 'Normal office BP but elevated home BP readings. Associated with increased cardiovascular risk.', category: 'Hypertension' },
  { term: 'Resistant Hypertension', definition: 'BP above goal despite 3 antihypertensive medications (including a diuretic) at optimal doses.', category: 'Hypertension' },
  { term: 'Ambulatory BP Monitoring', definition: 'Continuous BP measurement over 24 hours to assess BP patterns and confirm diagnosis.', category: 'Hypertension' },

  // Heart Failure
  { term: 'HFrEF', definition: 'Heart Failure with Reduced Ejection Fraction. EF ≤40%, indicating systolic dysfunction.', category: 'Heart Failure' },
  { term: 'HFpEF', definition: 'Heart Failure with Preserved Ejection Fraction. EF ≥50%, indicating diastolic dysfunction.', category: 'Heart Failure' },
  { term: 'Ejection Fraction (EF)', definition: 'Percentage of blood ejected from the left ventricle with each contraction. Normal is 50-70%.', category: 'Heart Failure' },
  { term: 'Orthopnea', definition: 'Shortness of breath when lying flat, often requiring multiple pillows. Sign of volume overload.', category: 'Heart Failure' },
  { term: 'Paroxysmal Nocturnal Dyspnea (PND)', definition: 'Sudden awakening with shortness of breath, typically 1-2 hours after falling asleep. Suggests heart failure.', category: 'Heart Failure' },
  { term: 'Decompensation', definition: 'Worsening heart failure symptoms, often due to volume overload or inadequate cardiac output.', category: 'Heart Failure' },
  { term: 'Volume Status', definition: 'Assessment of fluid balance. "Wet" indicates congestion, "dry" indicates euvolemia or depletion.', category: 'Heart Failure' },
  { term: 'Perfusion', definition: 'Adequacy of blood flow to tissues. "Warm" indicates adequate perfusion, "cold" indicates poor perfusion.', category: 'Heart Failure' },

  // Asthma
  { term: 'Asthma', definition: 'Chronic inflammatory airway disease characterized by reversible airflow obstruction and bronchial hyperresponsiveness.', category: 'Asthma' },
  { term: 'Controller Medication', definition: 'Daily asthma medications (ICS, LABA, LTRA) that prevent symptoms and reduce inflammation.', category: 'Asthma' },
  { term: 'Reliever Medication', definition: 'Quick-relief medications (SABA) used for acute symptom relief during asthma exacerbations.', category: 'Asthma' },
  { term: 'ICS (Inhaled Corticosteroid)', definition: 'Anti-inflammatory medication that is the cornerstone of persistent asthma management.', category: 'Asthma' },
  { term: 'SABA (Short-Acting Beta-Agonist)', definition: 'Quick-relief bronchodilator for acute symptoms. Overuse (>2 days/week) indicates poor control.', category: 'Asthma' },
  { term: 'LABA (Long-Acting Beta-Agonist)', definition: 'Long-acting bronchodilator used with ICS for persistent asthma. Should not be used alone.', category: 'Asthma' },
  { term: 'Peak Flow', definition: 'Measurement of maximum speed of exhalation. Helps monitor asthma control and detect early changes.', category: 'Asthma' },
  { term: 'Asthma Exacerbation', definition: 'Acute worsening of asthma symptoms requiring increased medication or medical intervention.', category: 'Asthma' },

  // COPD
  { term: 'COPD', definition: 'Chronic Obstructive Pulmonary Disease. Progressive lung disease characterized by persistent airflow limitation.', category: 'COPD' },
  { term: 'GOLD Classification', definition: 'Global Initiative for Chronic Obstructive Lung Disease classification system based on symptoms and exacerbation risk.', category: 'COPD' },
  { term: 'FEV1 (Forced Expiratory Volume in 1 second)', definition: 'Amount of air forcefully exhaled in 1 second. Key measure of airflow obstruction in COPD.', category: 'COPD' },
  { term: 'LAMA (Long-Acting Muscarinic Antagonist)', definition: 'Long-acting bronchodilator. Cornerstone of COPD management along with LABA.', category: 'COPD' },
  { term: 'COPD Exacerbation', definition: 'Acute worsening of respiratory symptoms requiring additional treatment. Major driver of morbidity and mortality.', category: 'COPD' },
  { term: 'mMRC (Modified Medical Research Council)', definition: 'Dyspnea scale from 0-4 used to assess symptom burden in COPD.', category: 'COPD' },
  { term: 'CAT Score (COPD Assessment Test)', definition: '8-item questionnaire (score 0-40) assessing impact of COPD on daily life. ≥10 indicates high symptom burden.', category: 'COPD' },
  { term: 'Pulmonary Rehabilitation', definition: 'Comprehensive intervention including exercise training, education, and behavior change. Improves symptoms and quality of life.', category: 'COPD' },

  // Mood Disorders
  { term: 'Major Depressive Disorder', definition: 'Mental health condition characterized by persistent depressed mood or loss of interest affecting daily functioning.', category: 'Mood' },
  { term: 'Anhedonia', definition: 'Loss of interest or pleasure in previously enjoyable activities. Core symptom of depression.', category: 'Mood' },
  { term: 'PHQ-9', definition: 'Patient Health Questionnaire-9. 9-item screening tool for depression severity (score 0-27).', category: 'Mood' },
  { term: 'GAD-7', definition: 'Generalized Anxiety Disorder-7. 7-item screening tool for anxiety severity (score 0-21).', category: 'Mood' },
  { term: 'Generalized Anxiety Disorder', definition: 'Excessive worry about various events or activities, present more days than not for ≥6 months.', category: 'Mood' },
  { term: 'Panic Attack', definition: 'Sudden episode of intense fear with physical symptoms (palpitations, sweating, trembling, dyspnea).', category: 'Mood' },
  { term: 'Suicidal Ideation', definition: 'Thoughts about self-harm or suicide. Requires immediate safety assessment and intervention.', category: 'Mood' },

  // General
  { term: 'Chronic Disease', definition: 'Long-lasting condition that can be controlled but not cured. Requires ongoing management and monitoring.', category: 'General' },
  { term: 'Adherence', definition: 'Extent to which patient behavior matches agreed recommendations from healthcare provider.', category: 'General' },
  { term: 'Comorbidity', definition: 'Presence of one or more additional conditions co-occurring with a primary condition.', category: 'General' },
  { term: 'Exacerbation', definition: 'Acute worsening of a chronic condition beyond normal day-to-day variations.', category: 'General' },
  { term: 'Remission', definition: 'Period during which symptoms of a disease are reduced or disappear.', category: 'General' },
  { term: 'Titration', definition: 'Gradual adjustment of medication dose to achieve optimal therapeutic effect while minimizing side effects.', category: 'General' },
]

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Diabetes', 'Hypertension', 'Heart Failure', 'Asthma', 'COPD', 'Mood', 'General']

  const filteredTerms = glossaryTerms.filter((term) => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Glossary
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Key terms and concepts in chronic disease management
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Terms Count */}
        <div className="mb-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Glossary Terms */}
        {filteredTerms.length > 0 ? (
          <div className="space-y-4">
            {filteredTerms.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {item.term}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 whitespace-nowrap">
                    {item.category}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              No terms found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
