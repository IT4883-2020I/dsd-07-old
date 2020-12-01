import React, { Component, useState } from "react";
import moment from "moment";

import Timeline, {
    TimelineHeaders,
    SidebarHeader,
    DateHeader
} from "react-calendar-timeline/lib";

import generateFakeData from "./generate-fake-data";

var keys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start",
    itemTimeEndKey: "end",
    groupLabelKey: "title"
};
const { groups, items } = generateFakeData(5);

const CustomTimeline = (props) => {
    const { startDate, endDate } = props;

    return (
        <div>
            <Timeline
                groups={groups}
                items={items}
                keys={keys}
                itemsSorted
                itemTouchSendsClick={false}
                stackItems
                itemHeightRatio={0.75}
                showCursorLine
                canMove={false}
                canResize={false}
                visibleTimeStart={startDate}
                visibleTimeEnd={endDate}
            />
        </div>
    );
}

export default CustomTimeline;
