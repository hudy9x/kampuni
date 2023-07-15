import { Avatar, Button, Modal } from '@shared/ui'
import { useOrgMemberStore } from '../../../../store/orgMember'
import { ChangeEvent, useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi'
import { orgMemberSearch } from 'packages/ui-app/services/organizationMember'
import { useParams } from 'next/navigation'
import { useMemberStore } from 'packages/ui-app/store/example'

let timeout = 0
export default function ProjectMemberAdd() {
  const { orgID, projectId } = useParams()
  const [visible, setVisible] = useState(false)
  const [term, setTerm] = useState('')
  const { orgMembers } = useOrgMemberStore()
  const { members } = useMemberStore()

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.target
    const value = target.value

    if (!value) return

    timeout && clearTimeout(timeout)

    timeout = setTimeout(() => {
      orgMemberSearch({
        projectId,
        orgId: orgID,
        term: value
      }).then(result => {
        console.log(result)
      })
    }, 250) as unknown as number;

  }

  return (
    <div className="mt-4 text-right">
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Add new member"
        triggerBy={
          <div>
            <Button
              title="New member"
              leadingIcon={<HiOutlinePlus />}
              primary
            />
          </div>
        }
        content={
          <div className='bg-gray-50 rounded-lg border'>
            <input
              className='w-full bg-transparent px-4 py-3 border-b border-dashed rounded-t-lg'
              placeholder="Find your member"
              onChange={onChange}
            />

            <div className="divide-y divide-dashed">
              {orgMembers.map(member => {
                return (
                  <div key={member.id} className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={member.photo || ''}
                        name={member.name || ''}
                        size="lg"
                      />
                      <div className="flex flex-col text-sm">
                        <span className="text-gray-700 font-medium">
                          {member.name}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        }
      />
    </div>
  )
}
