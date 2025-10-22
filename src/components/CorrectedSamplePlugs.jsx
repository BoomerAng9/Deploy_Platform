import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Play, 
  Download, 
  Eye, 
  Code, 
  Settings, 
  Zap, 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Shield,
  Clock,
  DollarSign,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Rocket,
  Target,
  TrendingUp
} from 'lucide-react'

const CorrectedSamplePlugs = ({ onPlugSelect, selectedSubscriptionTier = 'lite' }) => {
  const [activeDemo, setActiveDemo] = useState(null)
  const [demoProgress, setDemoProgress] = useState(0)

  // Updated sample plugs with correct pricing and new tools
  const samplePlugs = {
    'content-automation': {
      id: 'content-automation',
      name: 'Content Automation Suite',
      category: 'Content & Marketing',
      complexity: 'medium',
      icon: FileText,
      description: 'Automated content generation, editing, and publishing across multiple platforms with AI-powered optimization.',
      longDescription: 'A comprehensive content automation system that leverages Perplexity for research, GPT-4o for writing, and various APIs for multi-platform publishing. Perfect for content creators, marketers, and agencies.',
      
      // Correct cost calculation
      estimatedCosts: {
        buildTokens: 350000,
        monthlyTokens: 180000,
        buildCost: 24.99,
        monthlyCost: 12.50,
        apiCalls: 150,
        computeMinutes: 45
      },
      
      // Tools from updated inventory
      toolsUsed: [
        'GPT-4o (Content generation)',
        'Perplexity API (Research & fact-checking)', 
        'Perplexity Sonar (Trend analysis)',
        'ElevenLabs TTS (Audio content)',
        'Whisper SDK (Transcription)',
        'Boost.Space MCP (Multi-platform publishing)',
        'ACP Protocol (Agent coordination)'
      ],
      
      features: [
        'AI-powered content research and generation',
        'Multi-platform publishing automation',
        'SEO optimization and keyword integration',
        'Content calendar management',
        'Performance analytics and optimization',
        'Voice-to-text content creation',
        'Automated social media posting'
      ],
      
      useCases: [
        'Blog post automation for agencies',
        'Social media content scheduling',
        'Podcast transcript generation',
        'Email newsletter automation',
        'Product description generation'
      ],
      
      deliverables: [
        'Content generation engine',
        'Multi-platform publishing system',
        'Analytics dashboard',
        'Content calendar interface',
        'API integrations setup'
      ],
      
      timeline: '6-8 hours',
      supportedTiers: ['medium', 'heavy', 'superior'],
      demoAvailable: true,
      
      // Security requirements
      securityTier: 'medium',
      complianceFeatures: [
        'Content approval workflows',
        'Brand safety checks',
        'Copyright compliance scanning'
      ]
    },

    'sports-analytics': {
      id: 'sports-analytics',
      name: 'Sports Analytics Dashboard',
      category: 'Analytics & Reporting',
      complexity: 'heavy',
      icon: BarChart3,
      description: 'Real-time sports data analysis with predictive modeling, player performance tracking, and automated reporting.',
      longDescription: 'Advanced sports analytics platform combining multiple data sources, AI-powered insights, and real-time visualization. Built for sports teams, analysts, and betting platforms.',
      
      estimatedCosts: {
        buildTokens: 1200000,
        monthlyTokens: 850000,
        buildCost: 89.99,
        monthlyCost: 65.00,
        apiCalls: 800,
        computeMinutes: 180
      },
      
      toolsUsed: [
        'Claude Opus (Complex analysis)',
        'Gemini 2.5 Pro MCP (Multimodal data)',
        'Perplexity Agent (Chart generation)',
        'DeepSeek R2 (Cost-effective processing)',
        'Sports APIs (Data feeds)',
        'ii-agent (Orchestration)',
        'Splunk OTEL (Analytics logging)'
      ],
      
      features: [
        'Real-time game statistics tracking',
        'Player performance analytics',
        'Predictive modeling for outcomes',
        'Automated report generation',
        'Interactive data visualizations',
        'Multi-sport data integration',
        'Custom alert systems'
      ],
      
      useCases: [
        'Professional sports team analysis',
        'Fantasy sports platforms',
        'Sports betting analytics',
        'Player scouting systems',
        'Performance coaching tools'
      ],
      
      deliverables: [
        'Real-time analytics dashboard',
        'Predictive modeling engine',
        'Automated reporting system',
        'Data visualization components',
        'API integration layer'
      ],
      
      timeline: '15-20 hours',
      supportedTiers: ['heavy', 'superior'],
      demoAvailable: true,
      
      securityTier: 'heavy',
      complianceFeatures: [
        'Data privacy protection',
        'Secure API handling',
        'Audit trail logging'
      ]
    },

    'customer-service-ai': {
      id: 'customer-service-ai',
      name: 'AI Customer Service Agent',
      category: 'Customer Support',
      complexity: 'medium',
      icon: MessageSquare,
      description: 'Intelligent customer service automation with multi-channel support, sentiment analysis, and escalation management.',
      longDescription: 'Comprehensive AI-powered customer service solution that handles inquiries across multiple channels, provides intelligent responses, and seamlessly escalates complex issues to human agents.',
      
      estimatedCosts: {
        buildTokens: 280000,
        monthlyTokens: 420000,
        buildCost: 19.99,
        monthlyCost: 28.50,
        apiCalls: 200,
        computeMinutes: 35
      },
      
      toolsUsed: [
        'GPT-4o (Conversation handling)',
        'Perplexity API (Knowledge lookup)',
        'ElevenLabs TTS (Voice responses)',
        'Whisper SDK (Voice input)',
        'Boost.Space MCP (CRM integration)',
        'ACP Protocol (Intent tracking)',
        'Sentiment analysis APIs'
      ],
      
      features: [
        'Multi-channel support (chat, email, voice)',
        'Intelligent response generation',
        'Sentiment analysis and mood tracking',
        'Automatic ticket categorization',
        'Escalation management system',
        'Knowledge base integration',
        'Performance analytics dashboard'
      ],
      
      useCases: [
        'E-commerce customer support',
        'SaaS product help desk',
        'Service industry inquiries',
        'Technical support automation',
        'Order status and tracking'
      ],
      
      deliverables: [
        'Multi-channel chat interface',
        'AI response engine',
        'Escalation workflow system',
        'Analytics dashboard',
        'CRM integrations'
      ],
      
      timeline: '8-12 hours',
      supportedTiers: ['medium', 'heavy', 'superior'],
      demoAvailable: true,
      
      securityTier: 'medium',
      complianceFeatures: [
        'Customer data protection',
        'Conversation logging',
        'Privacy compliance'
      ]
    },

    'workflow-orchestrator': {
      id: 'workflow-orchestrator',
      name: 'Business Workflow Orchestrator',
      category: 'Process Automation',
      complexity: 'heavy',
      icon: Settings,
      description: 'Advanced workflow automation with AI decision-making, multi-system integration, and intelligent process optimization.',
      longDescription: 'Enterprise-grade workflow orchestration platform that automates complex business processes, integrates multiple systems, and uses AI to optimize workflows in real-time.',
      
      estimatedCosts: {
        buildTokens: 950000,
        monthlyTokens: 650000,
        buildCost: 67.99,
        monthlyCost: 45.00,
        apiCalls: 500,
        computeMinutes: 120
      },
      
      toolsUsed: [
        'ii-agent (Workflow orchestration)',
        'Claude Opus (Complex decision logic)',
        'Boost.Space MCP (System integrations)',
        'ACP Protocol (Process tracking)',
        'Gemini MCP SDK (Multimodal processing)',
        'OPA (Policy enforcement)',
        'Splunk OTEL (Process monitoring)'
      ],
      
      features: [
        'Visual workflow designer',
        'AI-powered decision nodes',
        'Multi-system integrations',
        'Real-time process monitoring',
        'Exception handling automation',
        'Performance optimization',
        'Compliance tracking'
      ],
      
      useCases: [
        'Invoice processing automation',
        'Employee onboarding workflows',
        'Supply chain management',
        'Quality assurance processes',
        'Regulatory compliance automation'
      ],
      
      deliverables: [
        'Workflow design interface',
        'Process execution engine',
        'Integration connectors',
        'Monitoring dashboard',
        'Compliance reporting system'
      ],
      
      timeline: '18-25 hours',
      supportedTiers: ['heavy', 'superior'],
      demoAvailable: true,
      
      securityTier: 'superior',
      complianceFeatures: [
        'Process audit trails',
        'Data governance controls',
        'Regulatory compliance monitoring'
      ]
    },

    'meeting-assistant': {
      id: 'meeting-assistant',
      name: 'AI Meeting Assistant',
      category: 'Productivity',
      complexity: 'lite',
      icon: Calendar,
      description: 'Automated meeting transcription, summarization, and action item tracking with calendar integration.',
      longDescription: 'Smart meeting assistant that records, transcribes, and analyzes meetings to generate summaries, extract action items, and integrate with productivity tools.',
      
      estimatedCosts: {
        buildTokens: 110000,
        monthlyTokens: 85000,
        buildCost: 8.99,
        monthlyCost: 6.50,
        apiCalls: 50,
        computeMinutes: 15
      },
      
      toolsUsed: [
        'Whisper SDK (Transcription)',
        'DeepSeek R2 (Summarization)',
        'Calendar APIs (Scheduling)',
        'Email APIs (Follow-up)',
        'Basic NLP processing',
        'Cloud storage integration'
      ],
      
      features: [
        'Automatic meeting transcription',
        'AI-generated meeting summaries',
        'Action item extraction',
        'Calendar integration',
        'Follow-up email automation',
        'Speaker identification',
        'Searchable meeting archive'
      ],
      
      useCases: [
        'Team meeting documentation',
        'Client call summaries',
        'Interview transcription',
        'Training session notes',
        'Project status meetings'
      ],
      
      deliverables: [
        'Meeting recording interface',
        'Transcription engine',
        'Summary generation system',
        'Action item tracker',
        'Calendar integration'
      ],
      
      timeline: '3-5 hours',
      supportedTiers: ['lite', 'medium', 'heavy', 'superior'],
      demoAvailable: true,
      
      securityTier: 'light',
      complianceFeatures: [
        'Recording consent management',
        'Data encryption',
        'Access controls'
      ]
    },

    'digital-twin-org': {
      id: 'digital-twin-org',
      name: 'Digital Organization Twin',
      category: 'Enterprise AI',
      complexity: 'superior',
      icon: Users,
      description: 'Complete digital representation of your organization with AI-powered decision making, process simulation, and strategic planning.',
      longDescription: 'Revolutionary digital twin technology that creates a complete AI representation of your organization, enabling predictive analysis, strategic planning, and automated decision-making at enterprise scale.',
      
      estimatedCosts: {
        buildTokens: 2800000,
        monthlyTokens: 1200000,
        buildCost: 299.99,
        monthlyCost: 180.00,
        apiCalls: 1500,
        computeMinutes: 300,
        setupFee: 150
      },
      
      toolsUsed: [
        'GROK-4 (Advanced reasoning)',
        'Claude Opus (Strategic analysis)',
        'Gemini 2.5 Pro MCP (Multimodal processing)',
        'Perplexity Agent (Research & analysis)',
        'ii-agent (Complex orchestration)',
        'ACP Protocol (Full audit chains)',
        'Enterprise security stack'
      ],
      
      features: [
        'Complete organizational modeling',
        'Predictive scenario analysis',
        'Automated strategic planning',
        'Real-time decision simulation',
        'Cross-departmental optimization',
        'Risk assessment and mitigation',
        'Performance forecasting'
      ],
      
      useCases: [
        'Enterprise strategic planning',
        'Organizational restructuring',
        'Risk management systems',
        'Performance optimization',
        'Digital transformation'
      ],
      
      deliverables: [
        'Digital twin architecture',
        'Predictive modeling system',
        'Strategic planning interface',
        'Decision simulation engine',
        'Performance monitoring dashboard'
      ],
      
      timeline: '40-60 hours + consultation',
      supportedTiers: ['superior'],
      demoAvailable: false, // Requires consultation
      
      securityTier: 'defense-grade',
      complianceFeatures: [
        'Enterprise-grade security',
        'Full audit trails',
        'Regulatory compliance',
        'Data sovereignty controls'
      ]
    }
  }

  // Subscription tier compatibility
  const subscriptionTiers = {
    coffee: { name: 'Buy Me A Coffee', tokens: 50000, maxComplexity: 'lite' },
    lite: { name: 'LITE', tokens: 250000, maxComplexity: 'lite' },
    medium: { name: 'MEDIUM', tokens: 600000, maxComplexity: 'medium' },
    heavy: { name: 'HEAVY', tokens: 1500000, maxComplexity: 'heavy' },
    superior: { name: 'SUPERIOR', tokens: 3000000, maxComplexity: 'superior' }
  }

  const complexityOrder = ['lite', 'medium', 'heavy', 'superior']
  const currentTierIndex = complexityOrder.indexOf(subscriptionTiers[selectedSubscriptionTier]?.maxComplexity || 'lite')

  const canBuildPlug = (plug) => {
    const plugComplexityIndex = complexityOrder.indexOf(plug.complexity)
    const hasEnoughTokens = subscriptionTiers[selectedSubscriptionTier]?.tokens >= plug.estimatedCosts.buildTokens
    return plugComplexityIndex <= currentTierIndex && hasEnoughTokens
  }

  const startDemo = (plugId) => {
    setActiveDemo(plugId)
    setDemoProgress(0)
    
    // Simulate demo progress
    const interval = setInterval(() => {
      setDemoProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'lite': return 'from-green-500 to-emerald-600'
      case 'medium': return 'from-blue-500 to-indigo-600'
      case 'heavy': return 'from-purple-500 to-violet-600'
      case 'superior': return 'from-rose-500 to-pink-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Content & Marketing': return FileText
      case 'Analytics & Reporting': return BarChart3
      case 'Customer Support': return MessageSquare
      case 'Process Automation': return Settings
      case 'Productivity': return Calendar
      case 'Enterprise AI': return Users
      default: return Zap
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Sample Plugs & Demos
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Try our pre-built automation plugs before committing to custom development. Each sample includes live demos and detailed cost breakdowns.
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="outline">
            Current Plan: {subscriptionTiers[selectedSubscriptionTier]?.name}
          </Badge>
          <Badge variant="secondary">
            {subscriptionTiers[selectedSubscriptionTier]?.tokens.toLocaleString()} tokens/month
          </Badge>
        </div>
      </div>

      {/* Sample Plugs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.values(samplePlugs).map((plug) => {
          const Icon = plug.icon
          const CategoryIcon = getCategoryIcon(plug.category)
          const canBuild = canBuildPlug(plug)
          const isDemo = activeDemo === plug.id
          
          return (
            <Card 
              key={plug.id}
              className={`relative overflow-hidden transition-all duration-300 ${
                canBuild 
                  ? 'hover:shadow-xl hover:scale-105 cursor-pointer' 
                  : 'opacity-60'
              } ${isDemo ? 'ring-2 ring-blue-500' : ''}`}
            >
              {/* Complexity Badge */}
              <div className="absolute top-4 right-4">
                <Badge 
                  className={`bg-gradient-to-r ${getComplexityColor(plug.complexity)} text-white border-0`}
                >
                  {plug.complexity.toUpperCase()}
                </Badge>
              </div>

              {/* Availability Badge */}
              {!canBuild && (
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive">
                    Upgrade Required
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${getComplexityColor(plug.complexity)}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold mb-1">
                      {plug.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mb-2">
                      <CategoryIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {plug.category}
                      </span>
                    </div>
                    <CardDescription className="text-sm">
                      {plug.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Cost Information */}
                <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      ${plug.estimatedCosts.buildCost}
                    </div>
                    <div className="text-xs text-gray-500">Build Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      ${plug.estimatedCosts.monthlyCost}
                    </div>
                    <div className="text-xs text-gray-500">Monthly Run</div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Features:</h4>
                  <ul className="space-y-1">
                    {plug.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                    {plug.features.length > 3 && (
                      <li className="text-xs text-gray-500">
                        +{plug.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Timeline and Tokens */}
                <div className="flex justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{plug.timeline}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-3 w-3" />
                    <span>{plug.estimatedCosts.buildTokens.toLocaleString()} tokens</span>
                  </div>
                </div>

                {/* Demo Progress */}
                {isDemo && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Demo Progress</span>
                      <span>{demoProgress}%</span>
                    </div>
                    <Progress value={demoProgress} className="h-2" />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {plug.demoAvailable && canBuild && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => startDemo(plug.id)}
                      disabled={isDemo}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      {isDemo ? 'Running...' : 'Try Demo'}
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    className={`flex-1 ${canBuild ? '' : 'opacity-50 cursor-not-allowed'}`}
                    onClick={() => canBuild && onPlugSelect && onPlugSelect(plug)}
                    disabled={!canBuild}
                  >
                    {canBuild ? (
                      <>
                        <Rocket className="h-4 w-4 mr-1" />
                        Build This
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Upgrade Needed
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Detailed View Modal/Expandable Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Breakdown</TabsTrigger>
          <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How Sample Plugs Work</CardTitle>
              <CardDescription>
                Try before you build - experience AI automation with zero commitment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">1. Explore & Demo</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Browse our sample plugs and try live demos to see how they work in real-time.
                  </p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold">2. Customize & Quote</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Modify the plug to your needs and get an instant, accurate cost quote with our calculator.
                  </p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <Rocket className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">3. Build & Deploy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Approve the quote and watch ACHEEVY and the Boomer_Ang's build your custom plug.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical Architecture</CardTitle>
              <CardDescription>
                Built on the latest AI and automation technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Core Technologies</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="font-medium">ACHEEVY</div>
                      <div className="text-sm text-gray-500">AI Consultation</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="font-medium">Boomer_Ang's</div>
                      <div className="text-sm text-gray-500">Agent Orchestration</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="font-medium">ii-agent</div>
                      <div className="text-sm text-gray-500">Intelligent Internet</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="font-medium">ACP Protocol</div>
                      <div className="text-sm text-gray-500">Audit & Tracking</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">LLM Models Available</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 border rounded">
                        <span>DeepSeek R2</span>
                        <Badge variant="secondary">Cost Effective</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 border rounded">
                        <span>GPT-4o</span>
                        <Badge variant="secondary">Standard</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 border rounded">
                        <span>Claude Opus</span>
                        <Badge variant="secondary">Premium</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 border rounded">
                        <span>Perplexity Sonar</span>
                        <Badge variant="secondary">Research</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 border rounded">
                        <span>Gemini 2.5 Pro MCP</span>
                        <Badge variant="secondary">Multimodal</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 border rounded">
                        <span>GROK-4</span>
                        <Badge variant="secondary">Superior Only</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Methodology</CardTitle>
              <CardDescription>
                Transparent, fair pricing with no hidden costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Cost Components</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">LLM token usage (input + output)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Third-party API calls</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Compute resources ($0.008/minute)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Security tier multiplier</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">30% platform markup</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">15% refundable buffer</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">What You Get</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Complete plug source code</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Deployment scripts & documentation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Security policies & compliance</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">QA & security reports</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Ongoing support & updates</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">
                      Cost Protection Guarantee
                    </h4>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    Every quote includes a 15% buffer that is fully refundable if actual costs are lower. 
                    You only pay for what you actually use, ensuring complete cost transparency.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compatibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Compatibility</CardTitle>
              <CardDescription>
                See which plugs are available for your current subscription tier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(subscriptionTiers).map(([tierKey, tier]) => {
                  const availablePlugs = Object.values(samplePlugs).filter(plug => 
                    plug.supportedTiers.includes(tierKey) && tier.tokens >= plug.estimatedCosts.buildTokens
                  )
                  
                  return (
                    <div key={tierKey} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold flex items-center space-x-2">
                          <span>{tier.name}</span>
                          {selectedSubscriptionTier === tierKey && (
                            <Badge variant="default">Current Plan</Badge>
                          )}
                        </h3>
                        <div className="text-sm text-gray-500">
                          {tier.tokens.toLocaleString()} tokens/month
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {availablePlugs.map(plug => (
                          <div key={plug.id} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center space-x-2">
                              <plug.icon className="h-4 w-4" />
                              <span className="text-sm font-medium">{plug.name}</span>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getComplexityColor(plug.complexity)}`}
                            >
                              {plug.complexity}
                            </Badge>
                          </div>
                        ))}
                        {availablePlugs.length === 0 && (
                          <div className="col-span-full text-center text-gray-500 py-4">
                            No compatible plugs for this tier
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CorrectedSamplePlugs

