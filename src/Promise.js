import React, { Component } from 'react'

export class PromiseComponent extends Component {

    constructor (props) {
        super (props)
        this.state = {
            pending: true,
            error: null,
            result: null,
            skipped: false
        }
        this.setInitialState(props)
        this.__promiseComponent = true
    }

    componentDidMount () {
        this.onInitAndUpdate()
    }

    componentWillUnmount () {
        this.__unmounted = true
    }

    setState (...args) {
        if(!this.__unmounted)
            super.setState(...args)
    }

    componentDidUpdate (prevProps, prevState) {
        if(prevProps !== this.props)
            this.onInitAndUpdate()
    }

    onInitAndUpdate () {
        if(!this.props.promise) {
            throw new Error('Promise function is missing.')
        }
        if(!this.props.skip || (typeof this.props.skip === 'function' && !this.props.skip(this.props))) {
            this.executePromise()
        } else {
            this.setState({ pending: false, skipped: true })
        }
    }

    setInitialState (props) {
        const { initialValue, then } = props
        if(!initialValue)
            return
        this.state.pending = false
        if(typeof then === 'function') {
            this.state.result = then(initialValue)
        } else {
            this.state.result = initialValue
        }
    }

    executePromise (options = this.props, { mixin = false, replayed = false } = {}) {
        const { promise, then } = this.props
        const { pending, skipped } = this.state
        if(!pending || skipped) {
            this.setState({ pending: true, skipped: false })
        }
        this._backedOptions = mixin ? { ...this._backedOptions, ...options } : options
        return promise(mixin ? this._backedOptions : options, { replayed })
            .then(result => {
                if(typeof then === 'function') {
                    result = then(result)
                }
                this.setState({ result, error: null, pending: false })
                return result
            })
            .catch(error => {
                this.setState({ error, result: null, pending: false })
            })
    }

    render () {
        const { pending } = this.state
        const { render } = this.props

        if(pending === null) {
            return null
        }

        return render({
            ...this.state,
            replay: (options, mixin = true) => this.executePromise.bind(this)(options, { mixin, replayed: true })
        })

    }
}
PromiseComponent.displayName = 'PromiseComponent'