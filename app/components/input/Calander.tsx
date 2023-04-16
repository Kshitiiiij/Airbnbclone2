'use client'
import {DateRange, Range, RangeKeyDict} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
interface CalanderProps {
    value: Range
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[]
}
const Calander:React.FC<CalanderProps> = ({value, onChange, disabledDates}) => {
    return (
        <DateRange
        rangeColors ={["#F43F5E"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction='vertical'
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates}
        />
    )
}

export default Calander