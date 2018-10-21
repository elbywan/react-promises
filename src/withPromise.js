import React, { Component } from 'react'
import { PromiseComponent } from './Promise'

export function withPromise({
    skip,
    promise,
    then,
    props = _ => _
}) {
    return function (Component) {
        return function (ownProps) {
            const children = promiseProps => {
                const mixedProps = {
                    ...ownProps,
                    ...props(promiseProps, ownProps)
                }
                return (
                    <Component { ...mixedProps } />
                )
            }
            return (
                <PromiseComponent
                    skip={skip}
                    promise={promise}
                    render={children}
                    then={then}
                    { ...ownProps }
                />
            )
        }
    }
}