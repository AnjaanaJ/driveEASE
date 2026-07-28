import { useState } from "react";
import { Link } from "react-router-dom";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarView({ lessons,onSelectDate, selectedDate,onSelectLesson }) {
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());

    const lessonsByDate = {};
    lessons.forEach((lesson) => {
        const dateKey = lesson.date?.split("T")[0];
        if (!dateKey) return;
        if (!lessonsByDate[dateKey]) lessonsByDate[dateKey] = [];
        lessonsByDate[dateKey].push(lesson);
    });

    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const startWeekday = firstDayOfMonth.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const goToPreviousMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(viewYear - 1);
        } else {
            setViewMonth(viewMonth - 1);
        }
    };

    const goToNextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(viewYear + 1);
        } else {
            setViewMonth(viewMonth + 1);
        }
    };

    const gridCells = [];
    for (let i = 0; i < startWeekday; i++) {
        gridCells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        gridCells.push(day);
    }

    const formatDateKey = (day) => {
        const mm = String(viewMonth + 1).padStart(2, "0");
        const dd = String(day).padStart(2, "0");
        return `${viewYear}-${mm}-${dd}`;
    };

    const slotColorClass = (status) => {
        if (status === "Completed") return "bg-green-500/30 hover:bg-green-500/50";
        if (status === "Cancelled") return "bg-red-500/20 text-slate-400 hover:bg-red-500/30 line-through";
        return "bg-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/50";
    };

  return (
    <div className="bg-[var(--color-surface)]/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_0_30px_-5px_var(--color-accent)]">
        <div className="flex items-center justify-between mb-4">
            <button onClick={goToPreviousMonth} className="px-3 py-1 rounded-md bg-slate-800 text-white hover:bg-slate-700 transition">
                &larr;
            </button>
            <h2 className="text-lg font-semibold text-white">
                {MONTH_NAMES[viewMonth]} {viewYear}
            </h2>
            <button onClick={goToNextMonth} className="px-3 py-1 rounded-md bg-slate-800 text-white hover:bg-slate-700 transition">
                 &rarr;
            </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((wd) => (
                <div key={wd} className="text-center text-xs text-slate-400 font-medium py-1">
                {wd}
                </div>
            ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
            {gridCells.map((day, index) => {
            if (day === null) {
                return <div key={`blank-${index}`} className="aspect-square" />;
            }

            const dateKey = formatDateKey(day);
            const dayLessons = lessonsByDate[dateKey] || [];
            const activeLessons = dayLessons.filter((l) => l.status !== "Cancelled");
            const hasActiveLessons = activeLessons.length > 0;

            return (
                <div
                    key={dateKey}
                    onClick={() => onSelectDate && onSelectDate(dateKey)}
                    className={`aspect-square rounded-md p-1 border text-xs flex flex-col cursor-pointer transition ${
                        selectedDate === dateKey ? "border-2 border-white" : ""
                    } ${
                        hasActiveLessons
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                        : "border-white/5 bg-slate-900/30"
                    }`}
                >
                <span className="text-white font-medium">{day}</span>
                {dayLessons.length > 0 && (
                    <div className="mt-auto space-y-0.5 overflow-hidden">
                        {dayLessons.slice(0, 2).map((lesson) => (
                            <button
                                key={lesson._id}
                                onClick={(e) => {
                                    e.stopPropagation(); // don't also trigger the day cell's own onClick
                                    onSelectLesson ? onSelectLesson(lesson._id) : onSelectDate && onSelectDate(dateKey);
                                }}
                                className={`block w-full truncate text-[10px] text-white rounded px-1 text-left ${slotColorClass(lesson.status)}`}
                                title={`${lesson.startTime} - ${lesson.status}`}
                        >
                                {lesson.startTime}
                            </button>
                        ))}
                        {dayLessons.length > 2 && (
                            <span className="text-[10px] text-slate-400">+{dayLessons.length - 2} more</span>
                        )}
                    </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarView;