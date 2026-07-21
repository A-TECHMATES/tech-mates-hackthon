'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SAMPLE_CHALLENGE, LANGUAGES } from '@/lib/constants';
import {
  ArrowLeft, Clock, Zap, Brain, Lightbulb,
  FileText, BookOpen, Code2, Maximize2, Minimize2,
  Play, Send, RotateCcw, ChevronDown, AlertTriangle,
  CheckCircle, XCircle, Timer, HardDrive,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(
  () => import('@monaco-editor/react').then(mod => mod.default),
  { ssr: false, loading: () => (
    <div className="h-full flex items-center justify-center bg-surface-container-low">
      <div className="animate-pulse text-on-surface-variant">Loading editor...</div>
    </div>
  )}
);

const difficultyColors: Record<string, string> = {
  Easy: 'text-emerald-400 bg-emerald-500/10',
  Medium: 'text-amber-400 bg-amber-500/10',
  Hard: 'text-red-400 bg-red-500/10',
  Extreme: 'text-rose-400 bg-rose-500/10',
};

export default function ChallengePage() {
  const params = useParams();
  const challenge = SAMPLE_CHALLENGE;
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('# Write your solution here\n\ndef solution(nums, target):\n    # Your code here\n    pass\n');
  const [activeTab, setActiveTab] = useState('description');
  const [testTab, setTestTab] = useState('sample');
  const [fullscreen, setFullscreen] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [result, setResult] = useState<{
    status: string; runtime: number; memory: number; passed: number; total: number;
  } | null>(null);

  const handleRun = async () => {
    setRunning(true);
    setOutput(null);
    setResult(null);
    setTimeout(() => {
      setOutput('0 1\n\nRuntime: 0.045s\nMemory: 16.2 MB');
      setRunning(false);
    }, 1500);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setResult(null);
    setTimeout(() => {
      setResult({ status: 'Accepted', runtime: 42, memory: 16.2, passed: 5, total: 5 });
      setSubmitting(false);
    }, 2000);
  };

  const handleReset = () => {
    setCode('# Write your solution here\n\ndef solution(nums, target):\n    # Your code here\n    pass\n');
    setOutput(null);
    setResult(null);
  };

  const selectedLang = LANGUAGES.find(l => l.value === language);

  return (
    <main className={cn('min-h-screen bg-background', fullscreen && 'fixed inset-0 z-50')}>
      <Navbar />
      <div className={cn('pt-16', fullscreen && 'h-[calc(100vh-4rem)]')}>
        <div className={cn('flex flex-col lg:flex-row', fullscreen && 'h-full')}>
          {/* Left Panel - Description */}
          <div className={cn(
            'lg:w-1/2 xl:w-[45%] border-r border-[rgba(74,69,77,0.2)] overflow-y-auto',
            fullscreen ? 'h-full' : 'max-h-[50vh] lg:max-h-[calc(100vh-4rem)]'
          )}>
            <div className="p-4 sm:p-6">
              <Link href="/tracks" className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface transition-colors mb-4">
                <ArrowLeft className="h-4 w-4" /> Back
              </Link>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-space text-xl sm:text-2xl font-bold text-on-surface">{challenge.title}</h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full', difficultyColors[challenge.difficulty])}>
                      {challenge.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <Clock className="h-3.5 w-3.5" /> {challenge.estimatedTime}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <Zap className="h-3.5 w-3.5" /> {challenge.points} points
                    </span>
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <Brain className="h-3.5 w-3.5" /> {challenge.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 border-b border-[rgba(74,69,77,0.2)] mb-5">
                {[
                  { id: 'description', label: 'Description', icon: FileText },
                  { id: 'solution', label: 'Editorial', icon: BookOpen },
                  { id: 'submissions', label: 'Submissions', icon: Code2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-all -mb-[1px]',
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-on-surface-variant hover:text-on-surface'
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {activeTab === 'description' && (
                <div className="space-y-6 text-sm">
                  <div>
                    <h3 className="font-space text-base font-semibold text-on-surface mb-2">Story</h3>
                    <p className="text-on-surface-variant leading-relaxed">{challenge.story}</p>
                  </div>

                  <div>
                    <h3 className="font-space text-base font-semibold text-on-surface mb-2">Description</h3>
                    <p className="text-on-surface-variant leading-relaxed">{challenge.description}</p>
                  </div>

                  <div>
                    <h3 className="font-space text-base font-semibold text-on-surface mb-2">Input Format</h3>
                    <div className="bg-surface-container-low rounded-xl p-4 font-mono text-xs text-on-surface-variant">
                      {challenge.inputFormat}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-space text-base font-semibold text-on-surface mb-2">Output Format</h3>
                    <div className="bg-surface-container-low rounded-xl p-4 font-mono text-xs text-on-surface-variant">
                      {challenge.outputFormat}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-space text-base font-semibold text-on-surface mb-2">Constraints</h3>
                    <div className="bg-surface-container-low rounded-xl p-4 font-mono text-xs text-on-surface-variant whitespace-pre-line">
                      {challenge.constraints}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-space text-base font-semibold text-on-surface mb-3">Examples</h3>
                    {challenge.examples.map((ex, i) => (
                      <div key={i} className="bg-surface-container-low rounded-xl p-4 mb-3">
                        <div className="mb-2">
                          <span className="text-xs font-medium text-on-surface-variant">Example {i + 1}:</span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-medium text-emerald-400">Input:</span>
                            <pre className="mt-1 font-mono text-xs text-on-surface-variant bg-background rounded-lg p-2 overflow-x-auto">{ex.input}</pre>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-amber-400">Output:</span>
                            <pre className="mt-1 font-mono text-xs text-on-surface-variant bg-background rounded-lg p-2 overflow-x-auto">{ex.output}</pre>
                          </div>
                          {ex.explanation && (
                            <div>
                              <span className="text-xs font-medium text-on-surface-variant">Explanation:</span>
                              <p className="mt-1 text-xs text-on-surface-variant">{ex.explanation}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-space text-base font-semibold text-on-surface mb-2">Notes</h3>
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                      <Lightbulb className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-on-surface-variant">{challenge.notes}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-space text-base font-semibold text-on-surface mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" /> Hints
                    </h3>
                    <div className="space-y-2">
                      {challenge.hints.map((hint, i) => (
                        <details key={i} className="group">
                          <summary className="text-sm text-primary cursor-pointer hover:text-primary-fixed-dim transition-colors">
                            Hint {i + 1}
                          </summary>
                          <p className="mt-2 text-xs text-on-surface-variant bg-surface-container-low rounded-xl p-3">{hint}</p>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {challenge.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-primary/5 text-primary border border-primary/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'solution' && (
                <div className="text-center py-12">
                  <BookOpen className="h-10 w-10 text-on-surface-variant mx-auto mb-3" />
                  <p className="text-sm text-on-surface-variant">Editorial coming soon</p>
                </div>
              )}

              {activeTab === 'submissions' && (
                <div className="text-center py-12">
                  <Code2 className="h-10 w-10 text-on-surface-variant mx-auto mb-3" />
                  <p className="text-sm text-on-surface-variant">No submissions yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Editor */}
          <div className={cn(
            'flex-1 flex flex-col',
            fullscreen ? 'h-full' : 'h-[50vh] lg:h-[calc(100vh-4rem)]'
          )}>
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[rgba(74,69,77,0.2)] bg-surface/50">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="appearance-none h-8 pl-3 pr-8 rounded-lg bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-sm text-on-surface focus:outline-none focus:border-primary/50 cursor-pointer"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-on-surface-variant pointer-events-none" />
                </div>
                <span className="text-xs text-on-surface-variant hidden sm:block">
                  {challenge.timeLimit}ms | {challenge.memoryLimit}MB
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04] transition-all"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
                <button
                  onClick={() => setFullscreen(!fullscreen)}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04] transition-all"
                >
                  {fullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </button>
                <div className="w-px h-6 bg-[rgba(74,69,77,0.2)]" />
                <button
                  onClick={handleRun}
                  disabled={running}
                  className="flex items-center gap-1.5 h-8 px-4 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all disabled:opacity-50"
                >
                  <Play className="h-3.5 w-3.5" />
                  {running ? 'Running...' : 'Run'}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-1.5 h-8 px-4 rounded-lg text-xs font-medium bg-gradient-to-r from-primary to-primary-fixed-dim text-[#010102] hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>

            {/* Editor */}
            <div className="flex-1 min-h-0">
              <MonacoEditor
                height="100%"
                language={selectedLang?.monaco || 'python'}
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  fontLigatures: true,
                  scrollBeyondLastLine: false,
                  padding: { top: 16 },
                  fontFamily: "'JetBrains Mono', monospace",
                  automaticLayout: true,
                  renderWhitespace: 'selection',
                  bracketPairColorization: { enabled: true },
                  tabSize: 4,
                }}
              />
            </div>

            {/* Test Cases & Output */}
            <div className="border-t border-[rgba(74,69,77,0.2)] bg-surface/30">
              <div className="flex items-center gap-1 px-4 pt-2">
                {[
                  { id: 'sample', label: 'Sample Tests' },
                  { id: 'hidden', label: 'Hidden Tests' },
                  { id: 'custom', label: 'Custom Input' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setTestTab(tab.id)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-medium rounded-t-lg transition-all',
                      testTab === tab.id
                        ? 'bg-surface-container-low text-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-surface-container-low max-h-48 overflow-y-auto">
                {testTab === 'sample' && (
                  <div className="space-y-3">
                    {challenge.examples.map((ex, i) => (
                      <div key={i} className="text-xs space-y-1">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <span className="font-medium">Test {i + 1}</span>
                          <span className="text-emerald-400">✓ Passed</span>
                        </div>
                        <pre className="font-mono text-on-surface-variant bg-background rounded-lg p-2 overflow-x-auto">
                          Input: {ex.input}{'\n'}
                          Expected: {ex.output}{'\n'}
                          Output: {ex.output}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                {testTab === 'hidden' && (
                  <div className="text-center py-6">
                    <p className="text-xs text-on-surface-variant">Hidden tests run on submission</p>
                  </div>
                )}

                {testTab === 'custom' && (
                  <div>
                    <textarea
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Enter your custom input here..."
                      rows={4}
                      className="w-full rounded-xl bg-background border border-[rgba(74,69,77,0.3)] p-3 text-xs font-mono text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 resize-none"
                    />
                    <button
                      onClick={handleRun}
                      className="mt-2 flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                    >
                      <Play className="h-3 w-3" /> Run with custom input
                    </button>
                  </div>
                )}

                {output && (
                  <div className="mt-3 pt-3 border-t border-[rgba(74,69,77,0.2)]">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
                      <Terminal className="h-3.5 w-3.5" />
                      Output
                    </div>
                    <pre className="font-mono text-xs text-on-surface bg-background rounded-xl p-3 overflow-x-auto">{output}</pre>
                  </div>
                )}

                {result && (
                  <div className="mt-3 pt-3 border-t border-[rgba(74,69,77,0.2)]">
                    <div className={cn(
                      'flex items-center gap-2 text-sm font-semibold mb-3',
                      result.status === 'Accepted' ? 'text-emerald-400' : 'text-red-400'
                    )}>
                      {result.status === 'Accepted' ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <XCircle className="h-5 w-5" />
                      )}
                      {result.status}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-background rounded-xl p-3 text-center">
                        <Timer className="h-4 w-4 text-primary mx-auto mb-1" />
                        <div className="text-sm font-bold text-on-surface">{result.runtime}ms</div>
                        <div className="text-xs text-on-surface-variant">Runtime</div>
                      </div>
                      <div className="bg-background rounded-xl p-3 text-center">
                        <HardDrive className="h-4 w-4 text-primary mx-auto mb-1" />
                        <div className="text-sm font-bold text-on-surface">{result.memory} MB</div>
                        <div className="text-xs text-on-surface-variant">Memory</div>
                      </div>
                      <div className="bg-background rounded-xl p-3 text-center">
                        <CheckCircle className="h-4 w-4 text-primary mx-auto mb-1" />
                        <div className="text-sm font-bold text-on-surface">{result.passed}/{result.total}</div>
                        <div className="text-xs text-on-surface-variant">Tests</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Terminal(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
