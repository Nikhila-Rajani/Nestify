"use client"

import React, { useCallback, useState } from "react"
import { toast } from "react-hot-toast"
import { Search, Users, Filter, Home } from "lucide-react"
import Loader from "../../components/CommonComponents/Loader"
import ErrorDisplay from "../../components/CommonComponents/ErrorDisplay"
import TableActions from "../../components/admin/TableAction"
import DataTable from "../../components/CommonComponents/TableData"
import Pagination from "../../components/CommonComponents/Pagination"
import CancelConfirmationModal from "../../components/CommonComponents/CancelConfirmationModal"
import useFetchData from "../../Hooks/useFetchData"
import { fetchHosts, blockHost } from "../../Api/adminApi"

const HostList: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isBlockedFilter, setIsBlockedFilter] = useState<string>("all")
  const [blockingHostId, setBlockingHostId] = useState<string | null>(null)
  const [showBlocking, setShowBlocking] = useState(false)

  const limit = 5

  const fetchHostsCallback = useCallback(
    () => fetchHosts(page, limit, searchTerm, isBlockedFilter),
    [page, searchTerm, isBlockedFilter],
  )

  const { data, loading, error, refetch } = useFetchData(fetchHostsCallback)

  const hosts = data?.hosts || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / limit)

  const handleBlockHost = (hostId: string) => {
    setBlockingHostId(hostId)
    setShowBlocking(true)
  }

  const confirmBlockHost = async () => {
    if (!blockingHostId) return
    const action = hosts.find((h: any) => h._id === blockingHostId)?.isBlocked ? "Unblock" : "Block"
    const toastId = toast.loading(`Processing...`)

    try {
      await blockHost(blockingHostId, !hosts.find((h: any) => h._id === blockingHostId)?.isBlocked)
      toast.success(`Host ${action.toLowerCase()}ed successfully.`, { id: toastId })
      refetch()
    } catch (err) {
      console.error("Error blocking/unblocking host:", err)
      toast.error("Something went wrong.", { id: toastId })
    } finally {
      setShowBlocking(false)
      setBlockingHostId(null)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trimStart()
    setSearchTerm(value)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const handleCloseModal = () => {
    setShowBlocking(false)
    setBlockingHostId(null)
  }

  if (loading) return <Loader />
  if (error) return <ErrorDisplay error={error} />

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-red-50">
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-600 rounded-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Host Listing</h1>
            </div>
            <p className="text-gray-600">Manage and monitor hosts and their listings</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <p className="text-sm font-medium text-gray-600">Total Hosts</p>
              <p className="text-2xl font-bold text-gray-900">{total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <p className="text-sm font-medium text-gray-600">Active Hosts</p>
              <p className="text-2xl font-bold text-green-600">{hosts.filter((h: any) => !h.isBlocked).length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <p className="text-sm font-medium text-gray-600">Blocked Hosts</p>
              <p className="text-2xl font-bold text-red-600">{hosts.filter((h: any) => h.isBlocked).length}</p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b mb-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search hosts..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={isBlockedFilter}
                  onChange={(e) => {
                    setIsBlockedFilter(e.target.value)
                    setPage(1)
                  }}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[160px] appearance-none cursor-pointer"
                >
                  <option value="all">All Hosts</option>
                  <option value="active">Active Only</option>
                  <option value="blocked">Blocked Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {hosts.length > 0 ? (
              <DataTable
                columns={["name", "email", "listings"]}
                data={hosts}
                actions={(host) => (
                  <TableActions
                    onBlock={() => handleBlockHost(host._id)}
                    isBlocked={host.isBlocked}
                    onViewDetails={() => console.log("View Host", host._id)}
                    verificationStatus=""
                  />
                )}
              />
            ) : (
              <div className="text-center py-16 text-gray-500">No hosts found</div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </div>
      </div>

      {/* Block/Unblock Modal */}
      <CancelConfirmationModal
        isOpen={showBlocking}
        onConfirm={confirmBlockHost}
        onClose={handleCloseModal}
        message={`Are you sure you want to ${
          hosts.find((h: any) => h._id === blockingHostId)?.isBlocked ? "unblock" : "block"
        } this host?`}
      />
    </div>
  )
}

export default HostList
