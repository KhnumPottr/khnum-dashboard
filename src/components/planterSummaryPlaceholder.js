import React from "react"
import { Panel, Placeholder, Loader } from "rsuite"

function planterSummaryPlaceholder() {
    const { Paragraph } = Placeholder
    return (
        <Panel shaded bodyFill style={{ display: "inline-block", width: "20rem", padding: "1rem" }}>
            <Paragraph style={{ marginTop: 30 }} rows={9} active>
                <Loader backdrop content="loading..." vertical />
            </Paragraph>
        </Panel>
    )
}

export default planterSummaryPlaceholder
