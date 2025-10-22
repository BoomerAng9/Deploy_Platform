import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Target,
  Star,
  Award,
  BarChart3,
  Activity,
  Zap,
  Crown
} from 'lucide-react'

// Current 2025 College Football Rankings (ESPN Way-Too-Early Top 25)
const currentRankings = [
  { rank: 1, team: "Penn State", conference: "Big Ten", record: "13-3", grade: 98, trend: "up" },
  { rank: 2, team: "Clemson", conference: "ACC", record: "10-4", grade: 96, trend: "up" },
  { rank: 3, team: "Texas", conference: "SEC", record: "13-3", grade: 95, trend: "down" },
  { rank: 4, team: "Georgia", conference: "SEC", record: "11-3", grade: 94, trend: "up" },
  { rank: 5, team: "Ohio State", conference: "Big Ten", record: "14-2", grade: 93, trend: "down" },
  { rank: 6, team: "Oregon", conference: "Big Ten", record: "13-1", grade: 92, trend: "stable" },
  { rank: 7, team: "Alabama", conference: "SEC", record: "9-4", grade: 91, trend: "up" },
  { rank: 8, team: "Notre Dame", conference: "Independent", record: "12-2", grade: 90, trend: "stable" },
  { rank: 9, team: "Miami", conference: "ACC", record: "10-3", grade: 89, trend: "up" },
  { rank: 10, team: "LSU", conference: "SEC", record: "8-5", grade: 88, trend: "up" },
  { rank: 11, team: "USC", conference: "Big Ten", record: "8-5", grade: 87, trend: "stable" },
  { rank: 12, team: "Michigan", conference: "Big Ten", record: "7-6", grade: 86, trend: "down" },
  { rank: 13, team: "Florida State", conference: "ACC", record: "2-10", grade: 85, trend: "up" },
  { rank: 14, team: "Ole Miss", conference: "SEC", record: "9-4", grade: 84, trend: "stable" },
  { rank: 15, team: "Utah", conference: "Big 12", record: "5-7", grade: 83, trend: "up" },
  { rank: 16, team: "Texas Tech", conference: "Big 12", record: "8-5", grade: 82, trend: "up" },
  { rank: 17, team: "Arizona State", conference: "Big 12", record: "11-3", grade: 81, trend: "stable" },
  { rank: 18, team: "Iowa State", conference: "Big 12", record: "11-3", grade: 80, trend: "stable" },
  { rank: 19, team: "Colorado", conference: "Big 12", record: "9-4", grade: 79, trend: "up" },
  { rank: 20, team: "Kansas State", conference: "Big 12", record: "9-4", grade: 78, trend: "stable" },
  { rank: 21, team: "Wisconsin", conference: "Big Ten", record: "5-7", grade: 77, trend: "up" },
  { rank: 22, team: "Virginia Tech", conference: "ACC", record: "6-7", grade: 76, trend: "up" },
  { rank: 23, team: "Louisville", conference: "ACC", record: "9-4", grade: 75, trend: "stable" },
  { rank: 24, team: "South Carolina", conference: "SEC", record: "9-4", grade: 74, trend: "up" },
  { rank: 25, team: "Oklahoma", conference: "SEC", record: "6-7", grade: 73, trend: "up" }
]

export default function UpdatedSportsAnalytics() {
  const [selectedTab, setSelectedTab] = useState('teams')
  const [selectedTeam, setSelectedTeam] = useState(null)

  const getGradeColor = (grade) => {
    if (grade >= 95) return 'text-purple-600 bg-purple-100'
    if (grade >= 90) return 'text-blue-600 bg-blue-100'
    if (grade >= 85) return 'text-green-600 bg-green-100'
    if (grade >= 80) return 'text-yellow-600 bg-yellow-100'
    return 'text-gray-600 bg-gray-100'
  }

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />
    if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
    return <Activity className="h-4 w-4 text-gray-500" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          2025 College Football Rankings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          ESPN Way-Too-Early Top 25 Rankings for the 2025 Season
        </p>
      </div>

      {/* Current Rankings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentRankings.map((team, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedTeam(team)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="font-bold">#{team.rank}</Badge>
                  {getTrendIcon(team.trend)}
                </div>
                <Badge className={getGradeColor(team.grade)}>
                  {team.grade}
                </Badge>
              </div>
              <h4 className="font-bold text-lg">{team.team}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{team.conference}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                2024 Record: {team.record}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conference Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Conference Breakdown</CardTitle>
          <CardDescription>Teams by conference in the Top 25</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">7</div>
              <div className="text-sm text-gray-600">Big Ten</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">6</div>
              <div className="text-sm text-gray-600">SEC</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">6</div>
              <div className="text-sm text-gray-600">Big 12</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-600">ACC</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Movers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Biggest Risers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Penn State</span>
                <Badge className="bg-green-100 text-green-800">#3 → #1</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Clemson</span>
                <Badge className="bg-green-100 text-green-800">#7 → #2</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Texas Tech</span>
                <Badge className="bg-green-100 text-green-800">NR → #16</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />
              <span>Notable Drops</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Ohio State</span>
                <Badge className="bg-red-100 text-red-800">#1 → #5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Texas</span>
                <Badge className="bg-red-100 text-red-800">#2 → #3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Michigan</span>
                <Badge className="bg-red-100 text-red-800">#8 → #12</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Storylines */}
      <Card>
        <CardHeader>
          <CardTitle>2025 Season Key Storylines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">New #1: Penn State</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The Nittany Lions jump to #1 after Ohio State lost key players to the NFL draft and both coordinators. 
                With Drew Allar, Kaytron Allen, and Nicholas Singleton returning, Penn State looks loaded.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Arch Manning Era Begins</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Texas drops to #3 but the highly anticipated Arch Manning era begins in Austin after waiting 
                patiently for two years behind Quinn Ewers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Clemson's Resurgence</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clemson jumps to #2 with Cade Klubnik returning and a stacked offense. The Tigers added 
                defensive coordinator Tom Allen to shore up their run defense.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Big Ten Dominance</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The Big Ten leads with 7 teams in the Top 25, including Penn State, Ohio State, Oregon, 
                USC, Michigan, and Wisconsin showing the conference's depth.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Team Details Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
             onClick={() => setSelectedTeam(null)}>
          <Card className="max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>#{selectedTeam.rank} {selectedTeam.team}</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTeam(null)}>×</Button>
              </CardTitle>
              <CardDescription>{selectedTeam.conference}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>2024 Record:</span>
                  <span className="font-medium">{selectedTeam.record}</span>
                </div>
                <div className="flex justify-between">
                  <span>ACHEEVY Grade:</span>
                  <Badge className={getGradeColor(selectedTeam.grade)}>
                    {selectedTeam.grade}/100
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Trend:</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(selectedTeam.trend)}
                    <span className="capitalize">{selectedTeam.trend}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

