import { useEffect, useState } from 'react'
import { httpGet, httpPost } from './_req'
import { messageError } from '@shared/ui'
import { useParams } from 'next/navigation'
import { useOrgMemberStore } from '../store/orgMember'

export const orgMemberGet = (projectId: string, orgId: string) => {
  return httpGet(`/api/org/members/${orgId}?projectId=${projectId}`)
}

export const orgMemberSearch = ({
  projectId,
  orgId,
  term
}: {
  projectId: string
  orgId: string
  term: string
}) => {
  return httpPost(`/api/org/member/search`, {
    projectId,
    orgId,
    term
  })
}

export const useOrgMemberGet = () => {
  const { projectId, orgID } = useParams()

  const { addAllOrgMember } = useOrgMemberStore()
  useEffect(() => {
    console.log('porjectid', projectId)
    orgMemberGet(projectId, orgID)
      .then(res => {
        const { data, status } = res.data

        addAllOrgMember(data)
      })
      .catch(err => {
        messageError(err)
      })
  }, [projectId])
}