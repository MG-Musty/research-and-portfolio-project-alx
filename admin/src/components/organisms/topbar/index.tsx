import React, {
  type MouseEvent,
  useCallback,
  useContext,
  useState,
} from "react"
import { PollingContext } from "../../../context/polling"
import useToggleState from "../../../hooks/use-toggle-state"
import Button from "../../fundamentals/button"
import HelpCircleIcon from "../../fundamentals/icons/help-circle"
import NotificationBell from "../../molecules/notification-bell"
import SearchBar from "../../molecules/search-bar"
import ActivityDrawer from "../activity-drawer"
import MailDialog from "../help-dialog"

const Topbar: React.FC = () => {
  const {
    state: activityDrawerState,
    toggle: toggleActivityDrawer,
    close: activityDrawerClose,
  } = useToggleState(false)

  const { batchJobs } = useContext(PollingContext)

  const [showSupportform, setShowSupportForm] = useState(false)

  const onNotificationBellClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      toggleActivityDrawer()
    },
    [toggleActivityDrawer]
  )

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between w-full border-b min-h-topbar max-h-topbar pr-xlarge pl-base bg-grey-0 border-grey-20">
      <SearchBar />
      <div className="flex items-center">
        <Button
          size="small"
          variant="ghost"
          className="w-8 h-8 mr-3"
          onClick={() => setShowSupportForm(!showSupportform)}
        >
          <HelpCircleIcon size={24} />
        </Button>

        <NotificationBell
          onClick={onNotificationBellClick}
          variant={"ghost"}
          hasNotifications={!!batchJobs?.length}
        />
      </div>
      {showSupportform && (
        <MailDialog
          open={showSupportform}
          onClose={() => setShowSupportForm(false)}
        />
      )}
      {activityDrawerState && (
        <ActivityDrawer onDismiss={activityDrawerClose} />
      )}
    </div>
  )
}

export default Topbar
